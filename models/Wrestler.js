import mongoose from "mongoose";

const WrestlerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	id: {
		type: String,
		required: true,
	},

	URL: {
		type: String,
		required: true,
	},

	Birthday: {
		type: String,
		default: "",
	},
	Birthplace: {
		type: String,
		default: "",
	},
	Height: {
		type: Number,
		default: 0,
	},
	Weight: {
		type: Number,
		default: 0,
	},
	Promotion: {
		type: String,
		default: "",
	},
	CagematchRating: {
		type: Number,
		default: 0,
	},
	Votes: {
		type: Number,
		default: 0,
	},
});

const WrestlerModel = mongoose.model("Wrestlers", WrestlerSchema);
export default WrestlerModel;
