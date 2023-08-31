const generateNumberModel = require('../models/generate_number.model');
const strings = require('../utils/strings');

function getMonthName(monthNumber) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return months[monthNumber - 1];
}
function getMonthName(monthNumber) {
	const months = [
		'January', 'February', 'March', 'April', 'May',
		'June', 'July', 'August', 'September', 'October',
		'November', 'December'
	];
	return months[monthNumber - 1];
}
function getCodeDate() {
	const digit = 2;
	const d = new Date();
	const codeHH = d.getDate().toString().padStart(digit, '0');
	const codeBB = (d.getMonth() + 1).toString().padStart(digit, '0');
	return codeHH + codeBB;
}
function getCodeSequence(lastCode) {
	const codeMin = 0;
	const codeMax = 999;
	const digit = codeMax.toString().length;

	// current date & month
	const currDateMonth = getCodeDate();

	// spliting lastCode
	const currMonth = currDateMonth.slice(-2);
	const lastMonth = lastCode.toString().substring(0, 4).slice(-2);
	const lastSeq = lastCode.toString().slice(-3);

	// check month number
	if (parseInt(currMonth) > parseInt(lastMonth))
		lastCode = codeMin;
	else if (lastCode.toString().length >= 13)
		lastCode = codeMin;
	else
		lastCode = parseInt(lastSeq);

	// sequence  
	const codeSeq = lastCode + 1;

	// result
	return currDateMonth + codeSeq.toString().padStart(digit, '0');
}

//const code;

exports.createGenerateNumber = async (req, res) => {
  req.body.nomor = `${Date.now()}`;
  generateNumberModel.create(req.body, (err, value) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    const a = value.populate('createdBy').execPopulate();
    a.then((doc) => res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc],
    }));
  });
};

exports.getLastCode = (req, res) => {
  generateNumberModel.find({},{'nomor':1}, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
      });
    }
    //code = doc
    //doc = getCodeSequence(doc);
    //docObj = JSON.parse(doc);
    //doc = docObj.nomor;
    doc[0].nomor = getCodeSequence(doc[0].nomor);
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      docs: doc,
    });
  }).sort({_id:-1}).limit(1);
};
