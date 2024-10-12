import mongoose from "mongoose";
import { Category, ReceivedGrant } from "../core/constants";
import Schema from "mongoose";

/**
 * Schema definition for the pre-review model
 * @property {Schema.Types.ObjectId} user - ObjectId reference to the user document
 * @property {PreReviewAnswers} preReviewAnswers - Object containing the pre-review answers
 * @property {string} grantId - Id of the project the user is submitting a pre-review from
 * @property {Date} createdAt - Date when the pre-review document was created
 * @property {Date} updatedAt - Date when the pre-review document was last updated
 * @returns {Schema} - Mongoose schema definition for the pre-review model
 */
const preReviewSchema = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	preReviewAnswers: {
		category: { type: String, enum: Object.values(Category), required: true },
		otherCategoryDescriptions: {
			type: String,
			required: function (this: { category: string }) {
				return this.category === Category.Other;
			}
		},
		receivedGrant: { type: String, enum: Object.values(ReceivedGrant), required: true }
	},
	grantId: { type: Number, required: true },
	programId: { type: Number, required: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export const PreReview = mongoose.model("PreReview", preReviewSchema);
