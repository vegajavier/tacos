let connection = require ('./connection.js');


function printQuestionMarks(num) {
	let arr = [];

	for (let i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

function objToSql(ob) {
	let arr = [];

	for (let key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

let orm = {
	all: function(tableInput, cb) {
		let queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	create: function(table, cols, vals, cb) {
		let queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	update: function(table, objColVals, condition, cb) {
		let queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	}
};


//export
module.exports = orm