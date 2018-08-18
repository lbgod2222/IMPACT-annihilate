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