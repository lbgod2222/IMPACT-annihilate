const jwt = require('jsonwebtoken');
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
// @ 5010 'Illegal authorzation'
// @ 5011 'out of date'
// @ 5012 'jwt must be provided'
// !NOW IS NOT IN USE, CAUSE WE HAVE A MIDDLEWARE WORKS THE SAME
exports.validateAuth = (str, uid, res, cb) => {
  let now = Date.now();
  let message;
	jwt.verify(str, secret, (err, decoded) => {
    if (err) {
      message = err;
    }
		if (!decoded || decoded._id !== uid) {
      let message = '5010'
			// return errCallback(message, res);
    }
    // if (decoded.exp < now) {
    //   let message = '5011'
    //   // return errCallback(message, res);
    // }
    cb(message)
	});
}