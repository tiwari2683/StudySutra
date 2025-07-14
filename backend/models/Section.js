const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({
	sectionName: { 
		type: String,
	},
	subSection: [
		{
			type: mongoose.Schema.Types.ObjectId, //this is the reference to the SubSection model
			required: true,
			ref: "SubSection", // this is the name of the model that we are referencing
		},
	],
});


module.exports = mongoose.model("Section", sectionSchema);
