const pool = require('../config/db.config.js');
const config = require('../config/config.js');



var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



exports.get = async (request, response) => {
	id = parseInt(request.params.id, 10);

	let baseQuery =
		`SELECT *
 			FROM "UOM"`;
	const binds = [];
	// console.log(request.params.id);
	if (request.params.id) {
		binds.push(request.params.id);
		baseQuery += `\n WHERE "UOM_ID" = $1`;
	}
	// console.log(baseQuery);
	// console.log(binds);
	// console.log(user_email);
	pool.query(baseQuery, binds, (error, result) => {
		// console.log(error);
		if (error) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
			throw error;
		} else if (!Array.isArray(result.rows) || result.rows.length < 1) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
		} else {

			// console.log(result.rows);
			respon = {
				'status': 'success',
				'data': result.rows
			}
			response.status(200).json(respon);

		}


	})
}



exports.post = async (request, response) => {

	const baseQuery =
		`INSERT INTO "UOM" ("UOM_NAME", "UOM_UNIT", "UOM_PRICE", "STATUS_ACTIVE") VALUES ($1, $2, $3, $4) RETURNING *`;
	const { UOM_NAME, UOM_UNIT, UOM_PRICE, STATUS_ACTIVE } = request.body
	const binds = [UOM_NAME, UOM_UNIT, UOM_PRICE, STATUS_ACTIVE];

	pool.query(baseQuery, binds, (error, result) => {
		// console.log(error);
		if (error) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
		} else if (!Array.isArray(result.rows) || result.rows.length < 1) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
		}
		else {// console.log(result.rows);
			respon = {
				'status': 'success',
				'data': result.rows[0]
			}
			response.status(200).json(respon);
		}
	})
}


exports.put = async (request, response) => {
	id = parseInt(request.params.id, 10);

	const baseQuery =
		`UPDATE "UOM"
		SET "UOM_NAME" = $1,
		"UOM_UNIT"= $2,
		"UOM_PRICE" =$3,
		"STATUS_ACTIVE" = $4
		WHERE "UOM_ID" = $5 RETURNING *`;
	const { UOM_NAME, UOM_UNIT, UOM_PRICE, STATUS_ACTIVE } = request.body
	const binds = [UOM_NAME, UOM_UNIT, UOM_PRICE, STATUS_ACTIVE, id];

	pool.query(baseQuery, binds, (error, result) => {
		// console.log(error);
		if (error) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
			// throw error;
		} else if (!Array.isArray(result.rows) || result.rows.length < 1) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);

			throw error;
		} else {
			respon = {
				'status': 'success',
				'data': result.rows[0]
			}
			response.status(200).json(respon);
		}
		// console.log(result.rows);


	})
}



exports.delete = async (request, response) => {
	id = parseInt(request.params.id, 10);

	const baseQuery =
		`DELETE FROM "UOM"
		WHERE "UOM_ID" = $1 RETURNING *`;
	const binds = [id];

	pool.query(baseQuery, binds, (error, result) => {
		// console.log(error);
		if (error) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
		} else if (!Array.isArray(result.rows) || result.rows.length < 1) {
			respon = {
				'status': 'failed',
				'error': error
			}
			response.status(404).json(respon);
		} else {
			respon = {
				'status': 'success'
			}
			response.status(200).json(respon);

		}
		// console.log(result.rows);


	})
}