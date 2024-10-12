import { Request, Response } from "express";
import { PreReview } from "../models/Review";
import { User } from "../models/User";
import { HttpCode, PreReviewAnswers, CreatePreReviewRequest, EthereumAddress } from "../core/constants";

/**
 * Class to manage the CRUD operations for the pre-review model
 */
export class ReviewController {
	/**
	 * Function to create a pre-review document in MongoDB
	 * @param req - Express request object containing the pre-review data.
	 * {} - Empty object for routes paremeters as it won't be used.
	 * {} - Empty object for response body as it won't be used.
	 * CreatePreReviewRequest - Custom type defined in @link ../core/constants/index.ts
	 * @param res - Express response object to send the pre-review document
	 * @returns {Promise<void>} - Promise that resolves when the pre-review document is created
	 *
	 */
	async createPreReview(req: Request<{}, {}, CreatePreReviewRequest>, res: Response): Promise<void> {
		try {
			const { preReviewAnswers, connectedUserAddress, grantId, programId } = req.body;

			let user = await User.findOne({ connectedUserAddress });

			// Create a new user if not found
			if (!user) {
				user = new User({ connectedUserAddress });
				await user.save();
			}

			const newPreReview = new PreReview({
				user: user._id,
				preReviewAnswers,
				grantId,
				programId
			});

			await newPreReview.save();
			res.status(HttpCode.CREATED).json(newPreReview);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error creating pre-review", error });
		}
	}

	/**
	 * Function to get the pre-review documents for a user.
	 * @param req - Express request object containing the user's connected user address
	 * @param res - Express response object returning the status code and the pre-review documents
	 * @returns {Promise<void>} - Promise that resolves when the pre-review documents are fetched
	 */
	async getPreReviewsByUser(req: Request<{ connectedUserAddress: EthereumAddress }>, res: Response): Promise<void> {
		try {
			const { connectedUserAddress } = req.params;
			const user = await User.findOne({ connectedUserAddress });

			if (!user) {
				res.status(HttpCode.NOT_FOUND).json({ message: "User not found" });
				return;
			}

			const preReviews = await PreReview.find({ user: user._id });
			res.json(preReviews);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error fetching pre-reviews", error });
		}
	}
}
