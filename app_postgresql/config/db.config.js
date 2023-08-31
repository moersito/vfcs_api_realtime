const Pool = require('pg').Pool
const pool = new Pool({
	user: 'katdevpsql1',
	host: '198.167.141.140',
	database: 'katdev1',
	password: 'katdevpsql123',
	port: 5432,
})
module.exports = pool;