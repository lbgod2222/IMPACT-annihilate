// REGS
const emailReg = '^/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
const usernameReg = '/^[a-zA-Z]+[a-zA-Z0-9]{2,16}$/';

const validators = {
  email: (str) => {
    return str.search(emailReg);
  },
  username: (str) => {
    return str.search(usernameReg);
  }
}

module.exports = validators;