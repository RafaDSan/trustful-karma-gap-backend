/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Constants for the server to limit the number of requests per minute
 */
export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

/**
 * Enum for HTTP status codes
 */
export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

/**
 * Enum for the categories defined of pre-review questions
 */
export enum Category {
	DevTooling = "Dev tooling",
	Education = "Education",
	MarketingAndGrowth = "Marketing and Growth",
	DeFi = "DeFi",
	DAOsAndGovernance = "DAOs and Governance",
	Community = "Community",
	Gaming = "Gaming",
	PublicGoods = "Public Goods",
	ZKAndPrivacy = "ZK and privacy",
	Other = "Other"
}

/**
 * Enum for the received grant options defined of pre-review questions
 */
export enum ReceivedGrant {
	Yes = "Yes, I got approved",
	No = "No",
	Pending = "I don't have the answer yet"
}

/**
 * Interface for the pre-review answers
 */
export interface PreReviewAnswers {
	category: Category;
	otherCategoryDescriptions?: string;
	receivedGrant: ReceivedGrant;
}

/**
 * Interface for the request body of the create pre-review endpoint
 */
export interface CreatePreReviewRequest {
	preReviewAnswers: PreReviewAnswers;
	connectedUserAddress: EthereumAddress;
	grantId: string;
	programId?: string;
}

/**
 * Type for the Ethereum address format
 */
export type EthereumAddress = `0x${string}`;
