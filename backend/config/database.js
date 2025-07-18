const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL)
		.then(console.log(`DB Connection Success`))
		.catch((error) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
