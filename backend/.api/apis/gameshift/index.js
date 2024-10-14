"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'gameshift/3.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * ### Adds a new `Currency` to be tracked in the game's user wallets
     *
     * @summary Import Currency
     */
    SDK.prototype.projectTokenController_import = function (body, metadata) {
        return this.core.fetch('/nx/currencies/import', 'post', body, metadata);
    };
    /**
     * ### Updates Metadata of an imported Currency.
     *
     * Refreshes the metadata of a Currency based on the on-chain data.
     *
     * @summary Refresh Currency
     */
    SDK.prototype.projectTokenController_refreshMetadata = function (metadata) {
        return this.core.fetch('/nx/currencies/{itemId}/refresh', 'post', metadata);
    };
    /**
     * ### Removes an imported Currency.
     *
     * Un-importing a Currency will not remove any quantity of the currency
     *       from any on-chain wallets. However, it *will* remove the currency from GameShift.
     *       As a result, the currency will not longer appear in any queries. Furthermore,
     *       it will prevent you from being able to use GameShift to initiate any
     *       currency transfers.
     *
     * @summary Un-Import Currency
     */
    SDK.prototype.projectTokenController_unimport = function (metadata) {
        return this.core.fetch('/nx/currencies/{itemId}/un-import', 'post', metadata);
    };
    /**
     * ### Returns all Users registered in the game.
     *
     * @summary Fetch All Users
     */
    SDK.prototype.projectUserController_getAll = function (metadata) {
        return this.core.fetch('/nx/users', 'get', metadata);
    };
    /**
     * ### Registers a new User with your Game.
     *
     * @summary Register User
     */
    SDK.prototype.projectUserController_create = function (body, metadata) {
        return this.core.fetch('/nx/users', 'post', body, metadata);
    };
    /**
     * ### Returns User details.
     *
     * @summary Fetch User
     */
    SDK.prototype.projectUserController_get = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}', 'get', metadata);
    };
    /**
     * ### Returns User's wallet address.
     *
     * @summary Fetch User Wallet Address
     */
    SDK.prototype.projectUserController_getWalletAddress = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/wallet-address', 'get', metadata);
    };
    /**
     * ### Returns a paginated list of all the Items owned by a User registered with your game.
     *
     * Will also return all Currencies registered in the game, even if the User does not
     * possess any quantity of them.
     *
     * @summary Fetch User Items
     */
    SDK.prototype.projectUserController_getUserItems = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/items', 'get', metadata);
    };
    /**
     * ### Fetches an Item belonging to a User.
     *
     * If the item is not a Unique Asset, the response will include the
     *       quantity of the item in the user's possession.
     *
     * @summary Fetch User Item
     */
    SDK.prototype.projectUserController_getItem = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/items/{itemId}', 'get', metadata);
    };
    /**
     * ### Lends an Item to another User.
     *
     * Creates a Lending Grant that must be accepted by the borrower.
     *       Unless otherwise specified, the Item will return to the User after 30 days.
     *
     * @summary Lend User Item
     */
    SDK.prototype.projectUserController_createLease = function (body, metadata) {
        return this.core.fetch('/nx/users/{referenceId}/items/{itemId}/lend', 'post', body, metadata);
    };
    /**
     * ### Transfers an Item between Users, or to any on-chain wallet address.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Transfer User Item
     */
    SDK.prototype.projectUserController_transfer = function (body, metadata) {
        return this.core.fetch('/nx/users/{referenceId}/items/{itemId}/transfer', 'post', body, metadata);
    };
    /**
     * ### Requests User's consent to sign a transaction not produced by GameShift.
     *
     * @summary Sign External Transaction for User
     */
    SDK.prototype.projectUserController_signTransaction = function (body, metadata) {
        return this.core.fetch('/nx/users/{referenceId}/sign', 'post', body, metadata);
    };
    /**
     * ### Withdraw user USDC into fiat.
     *
     * Requires user consent. User provides consent at the URL returned by the method.
     *
     * @summary Initiate Withdrawal
     */
    SDK.prototype.projectUserController_withdraw = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/withdrawals', 'post', metadata);
    };
    /**
     * ### Returns a paginated list of withdrawal requests for the given user.
     *
     * @summary Fetch All Withdrawals
     */
    SDK.prototype.projectUserController_getWithdrawals = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/withdrawals', 'get', metadata);
    };
    /**
     * ### Returns details about an individual withdrawal request.
     *
     * @summary Fetch Withdrawal
     */
    SDK.prototype.projectUserController_getWithdrawal = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/withdrawals/{withdrawalId}', 'get', metadata);
    };
    /**
     * ### Retrieves a paginated list of enrollments for a given user.
     *
     * @summary Fetch User Loyalty Program Enrollments
     */
    SDK.prototype.projectUserController_getLoyaltyProgramEnrollmentsByUser = function (metadata) {
        return this.core.fetch('/nx/users/{referenceId}/enrollments', 'get', metadata);
    };
    /**
     * Gets a Transaction and its details
     *
     */
    SDK.prototype.transactionController_get = function (metadata) {
        return this.core.fetch('/nx/transactions/{transactionId}', 'get', metadata);
    };
    /**
     * ### Returns details about a Lending Grant.
     *
     * @summary Fetch Lending Grant
     */
    SDK.prototype.lendController_getLease = function (metadata) {
        return this.core.fetch('/nx/lending-grants/{id}', 'get', metadata);
    };
    /**
     * ### Revokes a request to borrow an `Asset`.
     *
     * Returns the `Asset` back to the lender.
     *
     * @summary Cancel Lending Grant
     */
    SDK.prototype.lendController_cancelLease = function (body, metadata) {
        return this.core.fetch('/nx/lending-grants/{id}', 'delete', body, metadata);
    };
    /**
     * ### Accepts a grant to borrow an `Asset`.
     *
     * Executes the lending grant, transfers `Asset` to borrower.
     *
     * @summary Accept Lending Grant
     */
    SDK.prototype.lendController_acceptLease = function (body, metadata) {
        return this.core.fetch('/nx/lending-grants/{id}/accept', 'post', body, metadata);
    };
    /**
     * ### Returns an `Asset` back to the lender.
     *
     * @summary Return Asset
     */
    SDK.prototype.lendController_returnLease = function (body, metadata) {
        return this.core.fetch('/nx/lending-grants/{id}/return', 'post', body, metadata);
    };
    /**
     * ### Returns multiple Items.
     *
     * @summary Fetch Many Items
     */
    SDK.prototype.itemsController_getAll = function (metadata) {
        return this.core.fetch('/nx/items', 'get', metadata);
    };
    /**
     * ### Returns an item
     *
     * @summary Fetch Item
     */
    SDK.prototype.itemsController_get = function (metadata) {
        return this.core.fetch('/nx/items/{itemId}', 'get', metadata);
    };
    /**
     * ### Creates a new Unique Asset and assigns it to a User.
     *
     * @summary Create Unique Asset
     */
    SDK.prototype.assetController_createAsset = function (body, metadata) {
        return this.core.fetch('/nx/unique-assets', 'post', body, metadata);
    };
    /**
     * ### Updates a Unique Asset.
     *
     * Provide attributes that will override the current asset's attributes.
     *       Only works with asset's that were created with GameShift.
     *       Please note that any attributes not specified will be deleted from the existing
     * asset.
     *
     * @summary Update Unique Asset
     */
    SDK.prototype.assetController_editAsset = function (body, metadata) {
        return this.core.fetch('/nx/unique-assets/{itemId}', 'put', body, metadata);
    };
    /**
     * ### Lists a Unique Asset for sale on the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary List Unique Asset for Sale on Marketplace
     */
    SDK.prototype.assetController_listAsset = function (body, metadata) {
        return this.core.fetch('/nx/unique-assets/{itemId}/list-for-sale', 'post', body, metadata);
    };
    /**
     * ### Buys a Unique Asset from the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Buy Unique Asset from Marketplace
     */
    SDK.prototype.assetController_buyAsset = function (body, metadata) {
        return this.core.fetch('/nx/unique-assets/{itemId}/buy', 'post', body, metadata);
    };
    /**
     * ### Removes a Unique Asset listed for sale from the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Cancel Unique Asset Listing on Marketplace
     */
    SDK.prototype.assetController_cancelListingAsset = function (metadata) {
        return this.core.fetch('/nx/unique-assets/{itemId}/cancel-listing', 'post', metadata);
    };
    /**
     * ### Returns a list of Asset Collections.
     *
     * This method will only return Asset Collections that were created by the
     *       Game associated with the API key.
     *
     * @summary Fetch All Asset Collections
     */
    SDK.prototype.collectionController_getAll = function (metadata) {
        return this.core.fetch('/nx/asset-collections', 'get', metadata);
    };
    /**
     * ### Creates a new Asset Collection.
     *
     * @summary Create New Asset Collection
     */
    SDK.prototype.collectionController_createCollection = function (body, metadata) {
        return this.core.fetch('/nx/asset-collections', 'post', body, metadata);
    };
    /**
     * ### Adds an existing Asset Collection that was created outside of GameShift.
     *
     * @summary Import Asset Collection
     */
    SDK.prototype.collectionController_importCollection = function (body, metadata) {
        return this.core.fetch('/nx/asset-collections/import', 'post', body, metadata);
    };
    /**
     * ### Returns an existing Asset Collection.
     *
     * @summary Fetch Asset Collection
     */
    SDK.prototype.collectionController_getCollection = function (metadata) {
        return this.core.fetch('/nx/asset-collections/{collectionId}', 'get', metadata);
    };
    /**
     * ### Removes an imported Asset Collection.
     *
     * Un-importing an Asset Collection will not remove the collection from
     *       the Solana blockchain. However, it *will* remove the collection from GameShift.
     *       As a result, the collection will no longer appear in any queries, and neither
     *       will any assets belonging to the collection. Furthermore, it will prevent
     *       you from being able to use GameShift to initiate asset transfers, marketplace
     *       interactions, and other asset actions for any assets that belong to the
     *       collection.
     *
     * @summary Un-Import Asset Collection
     */
    SDK.prototype.collectionController_unimport = function (metadata) {
        return this.core.fetch('/nx/asset-collections/{collectionId}/un-import', 'post', metadata);
    };
    /**
     * ### Returns a list of Assets in an Asset Collection.
     *
     * @summary Fetch Asset Collection's Assets
     */
    SDK.prototype.collectionController_getAssets = function (metadata) {
        return this.core.fetch('/nx/asset-collections/{collectionId}/assets', 'get', metadata);
    };
    /**
     * ### Returns the Developer Wallet on-chain address.
     *
     * @summary Fetch Developer Wallet Address
     */
    SDK.prototype.developerWalletController_fetchWalletAddress = function (metadata) {
        return this.core.fetch('/nx/developer-wallet/wallet-address', 'get', metadata);
    };
    /**
     * ### Returns a list of all the Items owned by the Developer Wallet.
     *
     * Will also return all Currencies registered in the game, even if the Developer Wallet
     * does not possess any quantity of them.
     *
     * @summary Fetch Developer Wallet Items
     */
    SDK.prototype.developerWalletController_getItems = function (metadata) {
        return this.core.fetch('/nx/developer-wallet/items', 'get', metadata);
    };
    /**
     * ### Transfers an Item to a user, or any on-chain wallet address
     *
     * @summary Transfer Developer Wallet Item
     */
    SDK.prototype.developerWalletController_transferItem = function (body, metadata) {
        return this.core.fetch('/nx/developer-wallet/items/{itemId}/transfer', 'post', body, metadata);
    };
    /**
     * ### Returns a list of Payments.
     *
     * @summary Fetch All Payments
     */
    SDK.prototype.paymentController_getAll = function (metadata) {
        return this.core.fetch('/nx/payments', 'get', metadata);
    };
    /**
     * ### Creates a Payment request for a User.
     *
     * User completes the Payment request at the URL returned by this method.
     *       This endpoint will only charge the user; it is your responsibility to monitor for
     *       payment success and perform any additional actions required.
     *
     * @summary Create Payment
     */
    SDK.prototype.paymentController_checkout = function (body, metadata) {
        return this.core.fetch('/nx/payments', 'post', body, metadata);
    };
    /**
     * ### Returns Payment details.
     *
     * @summary Fetch Payment
     */
    SDK.prototype.paymentController_get = function (metadata) {
        return this.core.fetch('/nx/payments/{paymentId}', 'get', metadata);
    };
    /**
     * ### Returns a list of all loyalty programs in the project
     *
     * @summary Get Loyalty Programs
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyPrograms = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs', 'get', metadata);
    };
    /**
     * ### Sends a transaction to create a new loyalty program.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Create Loyalty Program
     */
    SDK.prototype.loyaltyProgramController_createLoyaltyProgram = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs', 'post', body, metadata);
    };
    /**
     * ### Sends a transaction to update a loyalty program.
     *
     *  - To close a program, set `open` to false.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Update Loyalty Program
     */
    SDK.prototype.loyaltyProgramController_updateLoyaltyProgram = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}', 'put', metadata);
    };
    /**
     * ### Retrieves information about a specific loyalty program.
     *
     * @summary Get Loyalty Program
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyProgram = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}', 'get', metadata);
    };
    /**
     * ### Deletes a loyalty program and returns state rent back to the developer wallet.
     *
     *  - Requires all enrollments to be closed before deletion.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Delete Loyalty Program
     */
    SDK.prototype.loyaltyProgramController_deleteLoyaltyProgram = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}', 'delete', metadata);
    };
    /**
     * ### Sets the metadata of a loyalty program.
     *
     * @summary Set Loyalty Program Metadata
     */
    SDK.prototype.loyaltyProgramController_setLoyaltyProgramName = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/metadata', 'put', body, metadata);
    };
    /**
     * ### Retrieves a paginated list of enrollments for a given program.
     *
     * @summary Get Loyalty Program Enrollments
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyProgramEnrollments = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/enrollments', 'get', metadata);
    };
    /**
     * ### Creates a consent url for a user to enroll in a loyalty program.
     *
     * @summary Enroll User in Loyalty Program
     */
    SDK.prototype.loyaltyProgramController_enrollUserInLoyaltyProgram = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/enrollments', 'post', body, metadata);
    };
    /**
     * ### Creates a reward snapshot for a given program. Webhook will be sent once processing
     * is complete
     *
     * @summary Create Loyalty Program Rewards Snapshot
     */
    SDK.prototype.loyaltyProgramController_createLoyaltyProgramRewardSnapshot = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/rewards', 'post', body, metadata);
    };
    /**
     * ### Retrieves a paginated list of reward snapshots for a given program.
     *
     * @summary Get Loyalty Program Rewards Snapshots
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyProgramRewards = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/rewards', 'get', metadata);
    };
    /**
     * ### Retrieve information about a specific reward snapshot
     *
     * @summary Get Loyalty Program Rewards Snapshot
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyProgramRewardSnapshot = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/rewards/{rewardsId}', 'get', metadata);
    };
    /**
     * ### Sends a transaction to publish rewards to enrollments.
     *
     *  - Requires rewards to be funded before allocation.
     *
     *  - Requires rewards snapshot to be created before allocation (hence :rewardId)
     *
     * Note: This action uses the developer wallet
     *
     * @summary Publish Loyalty Program Rewards
     */
    SDK.prototype.loyaltyProgramController_allocateLoyaltyProgramRewards = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/rewards/{rewardsId}/publish', 'post', metadata);
    };
    /**
     * ### Sends a transaction to transfer reward funds from the developer wallet to the
     * loyalty program wallet.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Fund Loyalty Program Rewards
     */
    SDK.prototype.loyaltyProgramController_fundLoyaltyProgramRewards = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/fund', 'post', body, metadata);
    };
    /**
     * ### Sends a transaction to withdraw unallocated reward funds from the loyalty program
     * wallet to the developer wallet.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Withdraw Loyalty Program Rewards
     */
    SDK.prototype.loyaltyProgramController_withdrawLoyaltyProgramRewards = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/withdraw', 'post', body, metadata);
    };
    /**
     * ### Retrieves a summary of stats for a given program.
     *
     * @summary Get Loyalty Program Stats Summary
     */
    SDK.prototype.loyaltyProgramController_getLoyaltyProgramStatsSummary = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/programs/{programId}/stats/summary', 'get', metadata);
    };
    /**
     * ### Creates a consent url for a user to claim rewards for their enrollment from a
     * loyalty program.
     *
     * @summary Claim Rewards from Loyalty Program
     */
    SDK.prototype.loyaltyProgramEnrollmentsController_claimRewardsFromLoyaltyProgram = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/enrollments/{enrollmentId}/claim', 'post', body, metadata);
    };
    /**
     * ### Creates a consent url for a user to disenroll & withdraw their balance from a
     * loyalty program.
     *
     * @summary Disenroll User in Loyalty Program
     */
    SDK.prototype.loyaltyProgramEnrollmentsController_disenrollUserFromLoyaltyProgram = function (body, metadata) {
        return this.core.fetch('/nx/loyalty-rewards/enrollments/{enrollmentId}', 'delete', body, metadata);
    };
    /**
     * ### Retrieve information about a specific enrollment
     *
     * @summary Get Loyalty Program Enrollment
     */
    SDK.prototype.loyaltyProgramEnrollmentsController_getLoyaltyProgramEnrollmentById = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/enrollments/{enrollmentId}', 'get', metadata);
    };
    /**
     * ### Retrieves a paginated list of all enrollments in the project.
     *
     * @summary Get Loyalty Program Enrollments
     */
    SDK.prototype.loyaltyProgramEnrollmentsController_getLoyaltyProgramEnrollmentsByProject = function (metadata) {
        return this.core.fetch('/nx/loyalty-rewards/enrollments', 'get', metadata);
    };
    /**
     * ### Creates a new Stackable Asset.
     *
     * @summary Create Stackable Asset
     */
    SDK.prototype.stackableAssetController_createStackableAsset = function (body, metadata) {
        return this.core.fetch('/nx/stackable-assets', 'post', body, metadata);
    };
    /**
     * ### Issue some quantity of a Stackable Asset to a User.
     *
     * @summary Issue Stackable Asset(s)
     */
    SDK.prototype.stackableAssetController_issueAsset = function (body, metadata) {
        return this.core.fetch('/nx/stackable-assets/{itemId}', 'post', body, metadata);
    };
    /**
     * ### Updates a 'Stackable Asset'.
     *
     * Provide attributes that will override the current asset's attributes. Please note that
     * any attributes not specified will be deleted from the existing asset.
     *
     * @summary Update Stackable Asset
     */
    SDK.prototype.stackableAssetController_updateAsset = function (metadata) {
        return this.core.fetch('/nx/stackable-assets/{itemId}', 'put', metadata);
    };
    /**
     * ### Get a paginated list of all Crafting Recipes
     *
     * @summary Get All Crafting Recpies
     */
    SDK.prototype.craftingRecipesController_getAll = function (metadata) {
        return this.core.fetch('/nx/crafting-recipes', 'get', metadata);
    };
    /**
     * ### Create a new Crafting Recipe.
     *
     * @summary Create Crafting Recipe
     */
    SDK.prototype.craftingRecipesController_create = function (body, metadata) {
        return this.core.fetch('/nx/crafting-recipes', 'post', body, metadata);
    };
    /**
     * ### Get details about a single crafting recipe.
     *
     * @summary Get Crafting Recipe
     */
    SDK.prototype.craftingRecipesController_get = function (metadata) {
        return this.core.fetch('/nx/crafting-recipes/{recipeId}', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
