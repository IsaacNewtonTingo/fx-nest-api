const bcrypt = require("bcrypt");

const { sendEmail } = require("../helpers/send-email");

const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const {
  PendingUserVerification,
} = require("../models/pending-user-verification");
const { generateToken } = require("../helpers/generate-token");

exports.signup = async (req, res) => {
  try {
    let { phoneNumber, email } = req.body;

    let query = {};
    if (phoneNumber) {
      query = { phoneNumber };
    }
    if (email) {
      query = { email };
    }

    await User.findOne(query).then(async (response) => {
      if (response) {
        res.json({
          status: "Failed",
          message: `${
            phoneNumber ? "Phone number" : "Email"
          } is already registered`,
        });
      } else {
        const message = "signup";
        sendVerificationCode(req.body, res, message);
      }
    });
  } catch (error) {
    res.json({
      status: "Faled",
      message: `An error occured while signin up`,
      error: error.message,
    });
  }
};

const sendVerificationCode = async ({ phoneNumber, email }, res, msg) => {
  try {
    let verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await PendingUserVerification.findOneAndDelete({
      $or: [{ phoneNumber }, { email }],
    });
    const encryptedVerificationCode = await bcrypt.hash(verificationCode, 10);

    const toPhoneNumber = `+${phoneNumber}` || null;

    await PendingUserVerification.create({
      phoneNumber,
      email,
      verificationCode: encryptedVerificationCode,
      createdAt: Date.now(),
    });

    const message = `<p>
      Verify your email to complete your ${
        msg === "signup" ? "signup" : "password reset"
      } process.<br/>
      Code <b>expires in 10 minutes.
      <br/>
      <br/>
      <h4>${verificationCode}</h4>`;

    const subject = "Email verification";

    const emailResponse = await sendEmail(email, message, subject);

    if (emailResponse.error) {
      res.json({
        status: "Failed",
        message: "An error occured while sending email",
      });
    } else {
      res.json({
        status: "Success",
        message: `Verification code sent. Please verify your Email to finish ${
          message === "signup" ? "signup" : "password reset"
        } process. Code expires in 1hr`,
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: `An error occured while sending verification code`,
    });
  }
};

exports.verifyCode = async (req, res) => {
  let {
    verificationCode,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    channel,
  } = req.body;

  const existing = await PendingUserVerification.findOne({
    $or: [{ phoneNumber }, { email }],
  });

  if (!existing) {
    res.json({
      status: "Failed",
      message: "Verification code has expired. Please request for another",
    });
  } else {
    const encryptedCode = existing.verificationCode;

    const codeResponse = await bcrypt.compare(verificationCode, encryptedCode);

    if (codeResponse) {
      const hashed = await bcrypt.hash(password, 10);
      const privacy = [
        {
          aspect: "Message",
          setting: "Public",
        },
        {
          aspect: "Posts",
          setting: "Public",
        },
        {
          aspect: "Profile",
          setting: "Public",
        },
        {
          aspect: "Comment",
          setting: "Public",
        },
      ];

      const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashed,
        privacy,
        channel,
      });

      await existing.deleteOne();

      const token = await generateToken(newUser);
      res.cookie("token", token, { httpOnly: true, secure: true });

      const userObject = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        profilePicture: newUser.profilePicture,
        roleID: newUser.roleID,
        locationName: newUser.locationName,
        accountBalance: newUser.accountBalance,
      };

      res.json({
        status: "Success",
        message: "Account created successfull",
        data: userObject,
      });
    } else {
      res.json({
        status: "Failed",
        message: "Invalid verification code entered",
      });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { email },
      "firstName lastName profileicture username email phoneNumber roleID locationName password"
    );

    if (!user) {
      res.json({
        status: "Failed",
        message: `No user found with the given email. Please sign up`,
      });
    } else {
      const hashedPassword = user.password;
      const validUser = await bcrypt.compare(password, hashedPassword);
      if (!validUser) {
        //check if google or password user
        if (user.loginMethod == "google") {
          res.json({
            status: "Failed",
            message:
              "You previously signed up with Google. You can reset your password to use both methods",
          });
        } else {
          res.json({
            status: "Failed",
            message: "Wrong password. Please try again",
          });
        }
      } else {
        const token = await generateToken(user);
        res.cookie("token", token, { httpOnly: true, secure: true });

        const userObject = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture,
          roleID: user.roleID,
          accountBalance: user.accountBalance,
        };

        res.json({
          status: "Success",
          message: "Login successfull",
          data: userObject,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { given_name, family_name, picture, email, id, channel } = req.body;
    //check if user with the given email already exists
    const user = await User.findOne({ email });
    if (user) {
      //check if login by google
      if (user.loginMethod === "google") {
        //compare google user ID
        const storedGoogleUserID = user.googleUserID;
        const validID = await bcrypt.compare(id, storedGoogleUserID);
        if (validID) {
          //log them in
          const token = await generateToken(user);

          res.cookie("token", token, { httpOnly: true, secure: true });
          res.json({
            status: "Success",
            message: "Login successfull",
            data: user,
          });
        } else {
          res.json({
            status: "Failed",
            message: "Invalid google ID token provided",
          });
        }
      } else {
        res.json({
          status: "Failed",
          message: "User with the given email address already exists",
        });
      }
    } else {
      const privacy = [
        {
          aspect: "Message",
          setting: "Public",
        },
        {
          aspect: "Posts",
          setting: "Public",
        },
        {
          aspect: "Profile",
          setting: "Public",
        },
        {
          aspect: "Comment",
          setting: "Public",
        },
      ];

      const googleUserID = await bcrypt.hash(id, 10);

      const newUser = await User.create({
        firstName: given_name,
        lastName: family_name,
        phoneNumber: null,
        email,
        profilePicture: picture,
        privacy,
        googleUserID,
        loginMethod: "google",
        password: googleUserID,
        channel,
      });

      const token = await generateToken(newUser);
      res.cookie("token", token, { httpOnly: true, secure: true });

      const userObject = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        profilePicture: newUser.profilePicture,
        roleID: newUser.roleID,
        accountBalance: user.accountBalance,
      };

      res.json({
        status: "Success",
        message: "Account created successfull",
        data: userObject,
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while logging in with google",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let userID = req.params.id;

    const data = await User.findOne(
      { _id: userID },
      "firstName lastName email username phoneNumber createdAt profilePicture roleID accountBalance"
    );

    res.json({
      status: "Success",
      message: "User retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting user",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let { limit = 20, page = 0 } = req.query;

    const data = await User.find(
      {},
      "firstName lastName email phoneNumber createdAt accountBalance"
    )
      .skip(parseInt(limit) * parseInt(page))
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();
    const active = await User.countDocuments({ accountBalance: { $gte: 1 } });
    const inactive = await User.countDocuments({ accountBalance: { $lte: 0 } });
    res.json({
      status: "Success",
      message: "Users retrieved successfully",
      data: {
        data,
        total,
        active,
        inactive,
      },
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting users",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({
        status: "Failed",
        message: "Email is required",
      });
    } else {
      const existing = await User.findOne({ email });
      if (existing) {
        //send otp
        const message = "passReset";
        sendVerificationCode(req.body, res, message);
      } else {
        res.json({
          status: "Failed",
          message:
            "User with the given email address doesn't exist. Please signup",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while reseting password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let { verificationCode, email, password } = req.body;

    const existing = await PendingUserVerification.findOne({
      email,
    });

    if (!existing) {
      res.json({
        status: "Failed",
        message: "Verification code has expired. Please request for another",
      });
    } else {
      const encryptedCode = existing.verificationCode;

      const codeResponse = await bcrypt.compare(
        verificationCode,
        encryptedCode
      );

      if (codeResponse) {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.findOneAndUpdate(
          {
            email,
          },
          { password: hashed },
          { new: true }
        );

        await existing.deleteOne();

        const token = await generateToken(newUser);
        res.cookie("token", token, { httpOnly: true, secure: true });

        const userObject = {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          profilePicture: newUser.profilePicture,
          roleID: newUser.roleID,
          accountBalance: user.accountBalance,
        };

        res.json({
          status: "Success",
          message: "Password updated successfull",
          data: userObject,
        });
      } else {
        res.json({
          status: "Failed",
          message: "Invalid verification code entered",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while reseting password",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { balance, userID, clientID } = req.body;
    const data = await User.findOneAndUpdate(
      { _id: clientID },
      { accountBalance: balance },
      { new: true }
    );

    res.json({
      status: "Success",
      message: "User updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while updating balance",
    });
  }
};
