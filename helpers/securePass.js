const bcrypt = require("bcrypt");
const saltRnd = 10;

const encrypt = async (pass) => {
  return await bcrypt.hash(pass, saltRnd);
};

const decrypt = async (pass, hashedPass) => {
  return await bcrypt.compare(pass, hashedPass);
};

module.exports = { encrypt, decrypt }