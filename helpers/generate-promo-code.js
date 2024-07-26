const { PromoCode } = require("../models/promo-code");

async function generatePromoCode() {
  const defString = "CJKE";
  const count = await PromoCode.countDocuments();
  const num = count + 1;
  const code = `${defString}${num}`;
  return code;
}
module.exports = {
  generatePromoCode,
};
