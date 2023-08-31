const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const usersModel = require('../models/users.model');
const UsersModel = require('../models/users.model');
const strings = require('../utils/strings');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

exports.user_create = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.user_password, 8);
  let name = '';
  if (req.body.role_user_id === '1') {
    name = `${strings.code.UsersR}`;
  } else if (req.body.role_user_id === '2') {
    name = `${strings.code.UsersL2}`;
  } else if (req.body.role_user_id === '5') {
    name = `${strings.code.UsersBuyer}`;
  } else {
    name = `${strings.code.UsersL1}`;
  }
  req.body.user_code = `${name} - ${Date.now()}`;
  usersModel.create({
    user_code: req.body.user_code,
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: hashPassword,
    role_user_id: req.body.role_user_id,
    user_phone: req.body.user_phone,
    user_address: req.body.user_address,
    regency_id: req.body.regency_id,
    regency_name: req.body.regency_name,
    province_id: req.body.province_id,
    province_name: req.body.province_name,
    city_id: req.body.city_id,
    city_name: req.body.city_name,
    village_id: req.body.village_id,
    village_name: req.body.village_name,
    district_id: req.body.district_id,
    district_name: req.body.district_name,
    sub_district: req.body.sub_district,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    postal_code: req.body.postal_code,
    legacy_number: req.body.legacy_number,
    created_by: req.body.created_by,
    ktp: req.body.ktp,
    no_ktp: req.body.no_ktp,
    kk: req.body.kk,
    surface_area: req.body.surface_area,
    parent: req.body.parent,
    department: req.body.department,
    job: req.body.job,
    job_level: req.body.job_level,
    attachment: {
      location: {
        file_name: (typeof (req.files.location) !== 'undefined') ? req.files.location[0].filename : null,
      },
      owners: {
        file_name: (typeof (req.files.owner) !== 'undefined') ? req.files.owner[0].filename : null,
      },
      member: {
        file_name: (typeof (req.files.member) !== 'undefined') ? req.files.member[0].filename : null,
      },
      identification: {
        file_name: (typeof (req.files.ktp) !== 'undefined') ? req.files.ktp[0].filename : null,
      },
      sign: {
        file_name: (typeof (req.files.sign) !== 'undefined') ? req.files.sign[0].filename : null,
      },
    },
  }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    // var token = jwt.sign({ id: this.users._id }, config.jwtSecretKey, {
    //   expiresIn: 86400 // expires in 24 hours
    // });
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc]
      // auth: true,
      // token: token
    });
  });
};

exports.user_details = async (req, res) => {
  UsersModel.findById(req.params.id, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [user],
    });
  });
};

exports.getUserL1 = async (_req, res) => {
  UsersModel.find({ role_user_id: '3' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserL1ById = async (req, res) => {
  UsersModel.find({ role_user_id: '3', created_by: mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserL2 = async (_req, res) => {
  UsersModel.find({ role_user_id: '2' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserL1 = async (_req, res) => {
  UsersModel.find({ role_user_id: '3' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserL1L2 = async (_req, res) => {
  UsersModel.find({
    $or: [{
      role_user_id: '3',
    }, {
      role_user_id: '2',
    }],
  }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserRecycler = async (_req, res) => {
  UsersModel.find({ role_user_id: '1' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};


exports.getUserAdmin = async (_req, res) => {
  UsersModel.find({ role_user_id: '6' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserBuyerById = async (req, res) => {
  UsersModel.find({
    role_user_id: '5',
    created_by: mongoose.Types.ObjectId(req.params.id),
  }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getUserBuyer = async (_req, res) => {
  UsersModel.find({ role_user_id: '5' }, (err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.users = async (_req, res) => {
  UsersModel.find((err, user) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: user,
    });
  });
};

exports.getDownlineL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          created_date: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          created_by: req.body.id,
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};
exports.getDownlinebyL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          created_by: req.params.id,
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};
exports.user_update = async (req, res) => {
  UsersModel.update({ _id: req.params.id }, {
    $set: {
      user_code: req.body.user_code,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      role_user_id: req.body.role_user_id,
      user_phone: req.body.user_phone,
      user_address: req.body.user_address,
      regency_id: req.body.regency_id,
      regency_name: req.body.regency_name,
      province_id: req.body.province_id,
      province_name: req.body.province_name,
      city_id: req.body.city_id,
      city_name: req.body.city_name,
      village_id: req.body.village_id,
      village_name: req.body.village_name,
      district_id: req.body.district_id,
      district_name: req.body.district_name,
      sub_district: req.body.sub_district,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      postal_code: req.body.postal_code,
      legacy_number: req.body.legacy_number,
      created_by: req.body.created_by,
      ktp: req.body.ktp,
      no_ktp: req.body.no_ktp,
      kk: req.body.kk,
      surface_area: req.body.surface_area,
      parent: req.body.parent,
      department: req.body.department,
      job: req.body.job,
      job_level: req.body.job_level,
      attachment: {
        location: {
          file_name: (typeof (req.files.location) !== 'undefined') ? req.files.location[0].filename : null,
        },
        owners: {
          file_name: (typeof (req.files.owner) !== 'undefined') ? req.files.owner[0].filename : null,
        },
        member: {
          file_name: (typeof (req.files.member) !== 'undefined') ? req.files.member[0].filename : null,
        },
        identification: {
          file_name: (typeof (req.files.ktp) !== 'undefined') ? req.files.ktp[0].filename : null,
        },
        sign: {
          file_name: (typeof (req.files.sign) !== 'undefined') ? req.files.sign[0].filename : null,
        },
      },
    },
  }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc],
    });
  });
};

exports.user_delete = async (req, res) => {
  UsersModel.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc],
    });
  });
};

exports.usersChangePassword = async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.user_password_new, 8);
  UsersModel.findOne({ _id: req.params.id },
    (_err, doc) => {
      const passwordIsValid = bcrypt.compareSync(
        req.body.user_password_old.toString(),
        doc.user_password,
      );
      if (!passwordIsValid) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }

      UsersModel.update({ _id: req.params.id }, {
        $set: {
          user_password: hashPassword,
        },
      }, (err, doc) => {
        if (err) {
          return res.send({
            msg: strings.response.failed_created,
            error: true,
            status: 200,
            err,
            doc: [],
          });
        }
        return res.send({
          msg: strings.response.success_created,
          error: false,
          status: 200,
          doc: [doc],
        });
      });
    });
};

exports.usersChangePasswordEmail = async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.user_password_new, 8);
  UsersModel.findOne({ user_email: req.params.id },
    (err, _doc) => {
      UsersModel.updateOne({ user_email: req.params.id }, {
        $set: {
          user_password: hashPassword,
        },
      }, (err2, doc2) => {
        if (err) {
          return res.send({
            msg: strings.response.failed_created,
            error: true,
            status: 200,
            err2,
            doc: [],
          });
        }
        return res.send({
          msg: strings.response.success_created,
          error: false,
          status: 200,
          doc: [doc2],
        });
      });
    });
};

exports.user_delete = async (req, res) => {
  UsersModel.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc,
    });
  });
};

exports.loginEmailPassword = (req, res) => {
  UsersModel.findOne({ user_email: req.body.user_email },
    (_err, doc) => {
      if (doc === null) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.user_password.toString(),
        doc.user_password,
      );
      if (!passwordIsValid) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      const { user_name, user_email } = req.body
      // var token = jwt.sign({ user_name, user_password }, config.jwtSecretKey, {
      //     expiresIn: 86400 // expires in 24 hours
      //   });
      var token = jwt.sign({ user_name, user_email }, config.jwtSecretKey);
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
        auth: true,
        token: token
      });
    });
};

exports.totalL2 = async (_req, res) => {
  usersModel.aggregate(
    [
      {
        $match: { role_user_id: '2' },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        // total: user[0].count,
        doc: user,
      });
    },
  );
};

exports.totalL1 = async (_req, res) => {
  usersModel.aggregate(
    [
      {
        $match: { role_user_id: '3' },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: [],
      });
    },
  );
};

exports.totalL1ByUser = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          $and: [
            {
              created_by: req.params.id,
            },
            {
              role_user_id: '3',
            },
          ],
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: [],
      });
    },
  );
};

exports.totalL0 = async (_req, res) => {
  usersModel.aggregate(
    [
      {
        $match: { role_user_id: '4' },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        // total: user[0].count,
        doc: user,
      });
    },
  );
};

exports.totalBuyer = async (_req, res) => {
  usersModel.aggregate(
    [
      {
        $match: { role_user_id: '5' },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user[0].count,
        doc: [],
      });
    },
  );
};

exports.totalBuyerByUser = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          $and: [
            {
              created_by: req.params.id,
            },
            {
              role_user_id: '5',
            },
          ],
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user[0].count,
        doc: [],
      });
    },
  );
};

exports.getGroupRegency = async (_req, res) => {
  usersModel.aggregate(
    [

      {
        $match: {
          role_user_id: '2',
        },
      },
      {
        $group:
        {
          _id: '$regency_id',
          count: { $sum: 1 },
        },
      },

      {
        $lookup:
        {
          from: strings.Regency,
          localField: '_id',
          foreignField: '_id',
          as: 'regency_docs',
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 4 },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: user,
      });
    },
  );
};
