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
	else
		lastCode = parseInt(lastSeq);

	// sequence  
	const codeSeq = lastCode + 1;

	// result
	return currDateMonth + codeSeq.toString().padStart(digit, '0');
}

// get from DB regarding to each process, as example RM
// so, we just get the latest code of Receiving Material
// don't forget to add prefix code by each process e.g. RM, PR, etc
const latestRMCode = ('RM1803014').match(/\d+/);
const latestPRCode = ('PR1804014').match(/\d+/);
const latestBPCode = ('BP1803123').match(/\d+/);
const latestRBCode = ('RB1804123').match(/\d+/);
const latestDOCode = ('DO1804974').match(/\d+/);
const latestSOCode = ('SO1604512').match(/\d+/);

// generate code
console.log('VFCS Receiving Material Code = RM' + getCodeSequence(latestRMCode));
console.log('VFCS Production Order Transaction Code = PR' + getCodeSequence(latestPRCode));
console.log('VFCS Bales Pressing Code = BP' + getCodeSequence(latestBPCode));
console.log('VFCS Receiving Bales Code = RB' + getCodeSequence(latestRBCode));
console.log('VFCS Delivery Order Code = DO' + getCodeSequence(latestDOCode));
console.log('VFCS Sales Order Code = SO' + getCodeSequence(latestSOCode));



// BELOW FOR TESTING ONLY!
const lastCode = ('SO1604512').match(/\d+/);
const currMonth = getCodeDate().slice(-2);
const lastMonth = lastCode.toString().substring(0, 4).slice(-2);
const lastSeq = lastCode.toString().slice(-3);
console.log('BELOW FOR TESTING ONLY:');
console.log(getCodeDate());
console.log(currMonth);
console.log(lastMonth);
console.log(lastSeq);
console.log(getMonthName(parseInt(currMonth)));



