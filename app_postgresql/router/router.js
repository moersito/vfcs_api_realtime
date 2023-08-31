const authJwt = require('./verifyJwtToken');
/* .... */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../../swagger.json');

const auth_controller = require('../controller/auth_controller.js');
const uom_controller = require('../controller/uom_controller.js');
module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});



	app.post('/api/userlogin', auth_controller.userlogin);
	app.post('/api/create_users', [authJwt.verifyToken], auth_controller.createuser);

	//API ROUTES ROLE USER
	app.get('/api/uom', uom_controller.get);
	app.get('/api/uom/:id?', [authJwt.verifyToken], uom_controller.get);
	app.delete('/api/uom/:id?', [authJwt.verifyToken], uom_controller.delete);
	app.post('/api/uom', [authJwt.verifyToken], uom_controller.post);
	app.put('/api/uom/:id?', [authJwt.verifyToken], uom_controller.put);


	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
