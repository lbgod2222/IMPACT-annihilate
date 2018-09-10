// REGS
const emailReg = '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$';
const usernameReg = '^[a-zA-Z]+[A-Za-z0-9]{8,16}';

const validators = {
  email: (str) => {
    return str.test(emailReg);
  },
  username: (str) => {
      return str.test(usernameReg);
  }
}

module.exports = validators;