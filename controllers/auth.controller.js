const bcrypt = require('bcryptjs');
const UsersModel = require('../models/users.model');
const strings = require('../utils/strings');

exports.userlogin = function (req, res) {
  UsersModel.findOne({ user_email: req.body.user_email })
    .exec((err, user) => {
      if (err) {
        return callback(err);
      } if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(req.body.user_password, user.user_password, (err, result) => {
        if (result === true) {
          return res.send(user);
        }
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      });
    });
};
