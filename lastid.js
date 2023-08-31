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
	lastCode = lastCode.toString().substring(2);
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

//Get Latest Code
exports.getLastCode = (req, res) => {
  receivingMaterialModel.find({}, (err, doc) => {
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
    //doc[0].code = getCodeSequence(doc[0].code);
    return res.send({
      status: '200'+doc[0].code,
      error: false,
      msg: strings.response.success_created,
      docs: doc,
    });
  }).sort({_id:-1}).limit(1);
};