const pool = require('../config/db.config.js');
const config = require('../config/config.js');



var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.createuser = (request, response) => {
	//console.log("Buat_User_Baru");
	const { user_name, user_email, user_password, role_user_id, department_id, created_date, modified_date, created_by, modified_by, user_phone, job_id, job_level_id, address, district_id, legacy_number, postal_code } = request.body
	const password = bcrypt.hashSync(request.body.user_password, 8);

	//console.log('pasword hash ' + password);

	pool.query('INSERT INTO "USERS" ("USER_NAME", "USER_EMAIL", "USER_PASSWORD", "ROLE_USER_ID", "DEPARTMENT_ID", "CREATED_DATE", "MODIFIED_DATE", "CREATED_BY", "MODIFIED_BY", "USER_PHONE", "JOB_ID", "JOB_LEVEL_ID", "ADDRESS", "DISTRICT_ID", "LEGACY_NUMBER", "POSTAL_CODE") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *', [user_name, user_email, password, role_user_id, department_id, created_date, modified_date, created_by, modified_by, user_phone, job_id, job_level_id, address, district_id, legacy_number, postal_code], (error, result) => {
		if (error) {
			throw error
		} else if (!Array.isArray(result.rows) || result.rows.length < 1) {
			throw error
		}
		//console.log(result.rows);
		respon = {
			'status': 'success',
			'data': result.rows[0]
		}
		response.status(200).json(respon);
	});
}

exports.userlogin = (request, response) => {
	const user_email = request.body.user_email
	const user_password = request.body.user_password
	// console.log(user_email);
	pool.query('SELECT * FROM "USERS" WHERE "USER_EMAIL" = $1', [user_email], (error, results) => {
		if (error) {
			throw error
		}

		//console.log(results.rows[0].USER_PASSWORD) // one


		var passwordIsValid = bcrypt.compareSync(request.body.user_password, results.rows[0].USER_PASSWORD);
		if (!passwordIsValid) {
			return response.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

		var token = jwt.sign({ id: results.rows[0].USER_ID }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		response.status(200).send({ auth: true, accessToken: token });

	})
}