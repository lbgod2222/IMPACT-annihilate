// callback constants
const _errCB = {
	message: '',
	success: false
}
const _successCB = {
	data: {},
	success: true
}
const _successCountCB = {
	data: [],
	count: 0,
	success: true
}
const _successInfoCB = {
	message: '',
	success: true
}

exports.errCallback = (msg, res) => {
	let response = _errCB;
	response.message = msg.message;
	res.send(response);
}

exports.getCallback = (data, res) => {
	let response = _successCB;
	response.data = data;
	res.send(response);
}

exports.getCountCallback = (data, count, res) => {
	let response = _successCountCB;
	response.data = data;
	response.count = count;
	res.send(response);
}

exports.postSuccessCallback = (msg, res) => {
	let response = _successInfoCB;
	response.message = msg;
	res.send(response);
}