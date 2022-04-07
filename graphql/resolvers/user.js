require('dotenv').config();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: async ({ username, password, secret }) => {
    try {
      if (secret !== process.env.SECRETKEY) {
        return {};
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (err) {
      return err;
    }
  },
  login: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user)
        return { message: 'email or password is not correct.', success: false };
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword)
        return { message: 'email or password is not correct.', success: false };
      const token = jwt.sign(
        { id: user._id },
        'Nj8MHpEU1sBOX4xgP0S6tQKvLTy2VzRr',
        {
          expiresIn: '100d',
        }
      );
      return { access_token: token, success: true };
    } catch (err) {
      return { error: err, success: false };
    }
  },
};
