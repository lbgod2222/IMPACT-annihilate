const jwt = require('jsonwebtoken');
const { errCallback } = require('../utils/unitcb');
const { secret } = require('../utils/constant');

// Due with sort by params
exports.dueSortby = (str) => {
	let obj = {}
  	if (str) {
		store = str.split(':');
		key = store[0].trim();
		value = store[1].trim();
		switch (value) {
			case 'asc':
				value = 1;
				break;
			case 'desc':
				value = -1;
				break;
		}
		obj[key] = value;
		return obj;
	}
}

// Hook for validate user authoratio
exports.validateAuth = (str, uid, res) => {
	jwt.verify(str, secret, (err, decoded) => {
		if (err) {
			errCallback(err.message, res);
			return;
		}
		if (!decoded || decoded._id !== uid) {
			let message = 'Illegal authorzation'
			errCallback(message, res);
		}
	});
}