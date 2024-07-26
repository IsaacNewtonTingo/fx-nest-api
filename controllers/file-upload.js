const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const region = process.env.AWS_S3_BUCKET_REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const accessKey = process.env.AWS_S3_BUCKET_ACCESS_KEY;
const secretKey = process.env.AWS_S3_BUCKET_SECRET_KEY;
const baseUrl = process.env.AWS_S3_BASE_URL;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region,
});

exports.fileUpload = async (req, res) => {
  try {
    const file = req.file;

    const randomImageName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const imageName = randomImageName();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.json({
      uploaded: true,
      url: `${baseUrl}/${imageName}`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      uploaded: false,
      error: {
        message: error.message,
      },
    });
  }
};
