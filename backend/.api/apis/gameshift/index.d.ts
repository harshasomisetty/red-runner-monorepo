import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * ### Adds a new `Currency` to be tracked in the game's user wallets
     *
     * @summary Import Currency
     */
    projectTokenController_import(body: types.ProjectTokenControllerImportBodyParam, metadata: types.ProjectTokenControllerImportMetadataParam): Promise<FetchResponse<201, types.ProjectTokenControllerImportResponse201>>;
    /**
     * ### Updates Metadata of an imported Currency.
     *
     * Refreshes the metadata of a Currency based on the on-chain data.
     *
     * @summary Refresh Currency
     */
    projectTokenController_refreshMetadata(metadata: types.ProjectTokenControllerRefreshMetadataMetadataParam): Promise<FetchResponse<201, types.ProjectTokenControllerRefreshMetadataResponse201>>;
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
    projectTokenController_unimport(metadata: types.ProjectTokenControllerUnimportMetadataParam): Promise<FetchResponse<201, types.ProjectTokenControllerUnimportResponse201>>;
    /**
     * ### Returns all Users registered in the game.
     *
     * @summary Fetch All Users
     */
    projectUserController_getAll(metadata: types.ProjectUserControllerGetAllMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetAllResponse200>>;
    /**
     * ### Registers a new User with your Game.
     *
     * @summary Register User
     */
    projectUserController_create(body: types.ProjectUserControllerCreateBodyParam, metadata: types.ProjectUserControllerCreateMetadataParam): Promise<FetchResponse<201, types.ProjectUserControllerCreateResponse201>>;
    /**
     * ### Returns User details.
     *
     * @summary Fetch User
     */
    projectUserController_get(metadata: types.ProjectUserControllerGetMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetResponse200>>;
    /**
     * ### Returns User's wallet address.
     *
     * @summary Fetch User Wallet Address
     */
    projectUserController_getWalletAddress(metadata: types.ProjectUserControllerGetWalletAddressMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetWalletAddressResponse200>>;
    /**
     * ### Returns a paginated list of all the Items owned by a User registered with your game.
     *
     * Will also return all Currencies registered in the game, even if the User does not
     * possess any quantity of them.
     *
     * @summary Fetch User Items
     */
    projectUserController_getUserItems(metadata: types.ProjectUserControllerGetUserItemsMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetUserItemsResponse200>>;
    /**
     * ### Fetches an Item belonging to a User.
     *
     * If the item is not a Unique Asset, the response will include the
     *       quantity of the item in the user's possession.
     *
     * @summary Fetch User Item
     */
    projectUserController_getItem(metadata: types.ProjectUserControllerGetItemMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetItemResponse200>>;
    /**
     * ### Lends an Item to another User.
     *
     * Creates a Lending Grant that must be accepted by the borrower.
     *       Unless otherwise specified, the Item will return to the User after 30 days.
     *
     * @summary Lend User Item
     */
    projectUserController_createLease(body: types.ProjectUserControllerCreateLeaseBodyParam, metadata: types.ProjectUserControllerCreateLeaseMetadataParam): Promise<FetchResponse<201, types.ProjectUserControllerCreateLeaseResponse201>>;
    /**
     * ### Transfers an Item between Users, or to any on-chain wallet address.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Transfer User Item
     */
    projectUserController_transfer(body: types.ProjectUserControllerTransferBodyParam, metadata: types.ProjectUserControllerTransferMetadataParam): Promise<FetchResponse<201, types.ProjectUserControllerTransferResponse201>>;
    /**
     * ### Requests User's consent to sign a transaction not produced by GameShift.
     *
     * @summary Sign External Transaction for User
     */
    projectUserController_signTransaction(body: types.ProjectUserControllerSignTransactionBodyParam, metadata: types.ProjectUserControllerSignTransactionMetadataParam): Promise<FetchResponse<201, types.ProjectUserControllerSignTransactionResponse201>>;
    /**
     * ### Withdraw user USDC into fiat.
     *
     * Requires user consent. User provides consent at the URL returned by the method.
     *
     * @summary Initiate Withdrawal
     */
    projectUserController_withdraw(metadata: types.ProjectUserControllerWithdrawMetadataParam): Promise<FetchResponse<201, types.ProjectUserControllerWithdrawResponse201>>;
    /**
     * ### Returns a paginated list of withdrawal requests for the given user.
     *
     * @summary Fetch All Withdrawals
     */
    projectUserController_getWithdrawals(metadata: types.ProjectUserControllerGetWithdrawalsMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetWithdrawalsResponse200>>;
    /**
     * ### Returns details about an individual withdrawal request.
     *
     * @summary Fetch Withdrawal
     */
    projectUserController_getWithdrawal(metadata: types.ProjectUserControllerGetWithdrawalMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetWithdrawalResponse200>>;
    /**
     * ### Retrieves a paginated list of enrollments for a given user.
     *
     * @summary Fetch User Loyalty Program Enrollments
     */
    projectUserController_getLoyaltyProgramEnrollmentsByUser(metadata: types.ProjectUserControllerGetLoyaltyProgramEnrollmentsByUserMetadataParam): Promise<FetchResponse<200, types.ProjectUserControllerGetLoyaltyProgramEnrollmentsByUserResponse200>>;
    /**
     * Gets a Transaction and its details
     *
     */
    transactionController_get(metadata: types.TransactionControllerGetMetadataParam): Promise<FetchResponse<200, types.TransactionControllerGetResponse200>>;
    /**
     * ### Returns details about a Lending Grant.
     *
     * @summary Fetch Lending Grant
     */
    lendController_getLease(metadata: types.LendControllerGetLeaseMetadataParam): Promise<FetchResponse<200, types.LendControllerGetLeaseResponse200>>;
    /**
     * ### Revokes a request to borrow an `Asset`.
     *
     * Returns the `Asset` back to the lender.
     *
     * @summary Cancel Lending Grant
     */
    lendController_cancelLease(body: types.LendControllerCancelLeaseBodyParam, metadata: types.LendControllerCancelLeaseMetadataParam): Promise<FetchResponse<200, types.LendControllerCancelLeaseResponse200>>;
    /**
     * ### Accepts a grant to borrow an `Asset`.
     *
     * Executes the lending grant, transfers `Asset` to borrower.
     *
     * @summary Accept Lending Grant
     */
    lendController_acceptLease(body: types.LendControllerAcceptLeaseBodyParam, metadata: types.LendControllerAcceptLeaseMetadataParam): Promise<FetchResponse<201, types.LendControllerAcceptLeaseResponse201>>;
    /**
     * ### Returns an `Asset` back to the lender.
     *
     * @summary Return Asset
     */
    lendController_returnLease(body: types.LendControllerReturnLeaseBodyParam, metadata: types.LendControllerReturnLeaseMetadataParam): Promise<FetchResponse<201, types.LendControllerReturnLeaseResponse201>>;
    /**
     * ### Returns multiple Items.
     *
     * @summary Fetch Many Items
     */
    itemsController_getAll(metadata: types.ItemsControllerGetAllMetadataParam): Promise<FetchResponse<200, types.ItemsControllerGetAllResponse200>>;
    /**
     * ### Returns an item
     *
     * @summary Fetch Item
     */
    itemsController_get(metadata: types.ItemsControllerGetMetadataParam): Promise<FetchResponse<200, types.ItemsControllerGetResponse200>>;
    /**
     * ### Creates a new Unique Asset and assigns it to a User.
     *
     * @summary Create Unique Asset
     */
    assetController_createAsset(body: types.AssetControllerCreateAssetBodyParam, metadata: types.AssetControllerCreateAssetMetadataParam): Promise<FetchResponse<201, types.AssetControllerCreateAssetResponse201>>;
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
    assetController_editAsset(body: types.AssetControllerEditAssetBodyParam, metadata: types.AssetControllerEditAssetMetadataParam): Promise<FetchResponse<200, types.AssetControllerEditAssetResponse200>>;
    /**
     * ### Lists a Unique Asset for sale on the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary List Unique Asset for Sale on Marketplace
     */
    assetController_listAsset(body: types.AssetControllerListAssetBodyParam, metadata: types.AssetControllerListAssetMetadataParam): Promise<FetchResponse<201, types.AssetControllerListAssetResponse201>>;
    /**
     * ### Buys a Unique Asset from the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Buy Unique Asset from Marketplace
     */
    assetController_buyAsset(body: types.AssetControllerBuyAssetBodyParam, metadata: types.AssetControllerBuyAssetMetadataParam): Promise<FetchResponse<201, types.AssetControllerBuyAssetResponse201>>;
    /**
     * ### Removes a Unique Asset listed for sale from the marketplace.
     *
     * Requires User consent. User provides consent at the URL returned by the method.
     *
     * @summary Cancel Unique Asset Listing on Marketplace
     */
    assetController_cancelListingAsset(metadata: types.AssetControllerCancelListingAssetMetadataParam): Promise<FetchResponse<201, types.AssetControllerCancelListingAssetResponse201>>;
    /**
     * ### Returns a list of Asset Collections.
     *
     * This method will only return Asset Collections that were created by the
     *       Game associated with the API key.
     *
     * @summary Fetch All Asset Collections
     */
    collectionController_getAll(metadata: types.CollectionControllerGetAllMetadataParam): Promise<FetchResponse<200, types.CollectionControllerGetAllResponse200>>;
    /**
     * ### Creates a new Asset Collection.
     *
     * @summary Create New Asset Collection
     */
    collectionController_createCollection(body: types.CollectionControllerCreateCollectionBodyParam, metadata: types.CollectionControllerCreateCollectionMetadataParam): Promise<FetchResponse<201, types.CollectionControllerCreateCollectionResponse201>>;
    /**
     * ### Adds an existing Asset Collection that was created outside of GameShift.
     *
     * @summary Import Asset Collection
     */
    collectionController_importCollection(body: types.CollectionControllerImportCollectionBodyParam, metadata: types.CollectionControllerImportCollectionMetadataParam): Promise<FetchResponse<201, types.CollectionControllerImportCollectionResponse201>>;
    /**
     * ### Returns an existing Asset Collection.
     *
     * @summary Fetch Asset Collection
     */
    collectionController_getCollection(metadata: types.CollectionControllerGetCollectionMetadataParam): Promise<FetchResponse<200, types.CollectionControllerGetCollectionResponse200>>;
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
    collectionController_unimport(metadata: types.CollectionControllerUnimportMetadataParam): Promise<FetchResponse<201, types.CollectionControllerUnimportResponse201>>;
    /**
     * ### Returns a list of Assets in an Asset Collection.
     *
     * @summary Fetch Asset Collection's Assets
     */
    collectionController_getAssets(metadata: types.CollectionControllerGetAssetsMetadataParam): Promise<FetchResponse<200, types.CollectionControllerGetAssetsResponse200>>;
    /**
     * ### Returns the Developer Wallet on-chain address.
     *
     * @summary Fetch Developer Wallet Address
     */
    developerWalletController_fetchWalletAddress(metadata: types.DeveloperWalletControllerFetchWalletAddressMetadataParam): Promise<FetchResponse<200, types.DeveloperWalletControllerFetchWalletAddressResponse200>>;
    /**
     * ### Returns a list of all the Items owned by the Developer Wallet.
     *
     * Will also return all Currencies registered in the game, even if the Developer Wallet
     * does not possess any quantity of them.
     *
     * @summary Fetch Developer Wallet Items
     */
    developerWalletController_getItems(metadata: types.DeveloperWalletControllerGetItemsMetadataParam): Promise<FetchResponse<200, types.DeveloperWalletControllerGetItemsResponse200>>;
    /**
     * ### Transfers an Item to a user, or any on-chain wallet address
     *
     * @summary Transfer Developer Wallet Item
     */
    developerWalletController_transferItem(body: types.DeveloperWalletControllerTransferItemBodyParam, metadata: types.DeveloperWalletControllerTransferItemMetadataParam): Promise<FetchResponse<201, types.DeveloperWalletControllerTransferItemResponse201>>;
    /**
     * ### Returns a list of Payments.
     *
     * @summary Fetch All Payments
     */
    paymentController_getAll(metadata: types.PaymentControllerGetAllMetadataParam): Promise<FetchResponse<200, types.PaymentControllerGetAllResponse200>>;
    /**
     * ### Creates a Payment request for a User.
     *
     * User completes the Payment request at the URL returned by this method.
     *       This endpoint will only charge the user; it is your responsibility to monitor for
     *       payment success and perform any additional actions required.
     *
     * @summary Create Payment
     */
    paymentController_checkout(body: types.PaymentControllerCheckoutBodyParam, metadata: types.PaymentControllerCheckoutMetadataParam): Promise<FetchResponse<201, types.PaymentControllerCheckoutResponse201>>;
    /**
     * ### Returns Payment details.
     *
     * @summary Fetch Payment
     */
    paymentController_get(metadata: types.PaymentControllerGetMetadataParam): Promise<FetchResponse<200, types.PaymentControllerGetResponse200>>;
    /**
     * ### Returns a list of all loyalty programs in the project
     *
     * @summary Get Loyalty Programs
     */
    loyaltyProgramController_getLoyaltyPrograms(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramsMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramsResponse200>>;
    /**
     * ### Sends a transaction to create a new loyalty program.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Create Loyalty Program
     */
    loyaltyProgramController_createLoyaltyProgram(body: types.LoyaltyProgramControllerCreateLoyaltyProgramBodyParam, metadata: types.LoyaltyProgramControllerCreateLoyaltyProgramMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerCreateLoyaltyProgramResponse201>>;
    /**
     * ### Sends a transaction to update a loyalty program.
     *
     *  - To close a program, set `open` to false.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Update Loyalty Program
     */
    loyaltyProgramController_updateLoyaltyProgram(metadata: types.LoyaltyProgramControllerUpdateLoyaltyProgramMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerUpdateLoyaltyProgramResponse200>>;
    /**
     * ### Retrieves information about a specific loyalty program.
     *
     * @summary Get Loyalty Program
     */
    loyaltyProgramController_getLoyaltyProgram(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramResponse200>>;
    /**
     * ### Deletes a loyalty program and returns state rent back to the developer wallet.
     *
     *  - Requires all enrollments to be closed before deletion.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Delete Loyalty Program
     */
    loyaltyProgramController_deleteLoyaltyProgram(metadata: types.LoyaltyProgramControllerDeleteLoyaltyProgramMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerDeleteLoyaltyProgramResponse200>>;
    /**
     * ### Sets the metadata of a loyalty program.
     *
     * @summary Set Loyalty Program Metadata
     */
    loyaltyProgramController_setLoyaltyProgramName(body: types.LoyaltyProgramControllerSetLoyaltyProgramNameBodyParam, metadata: types.LoyaltyProgramControllerSetLoyaltyProgramNameMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerSetLoyaltyProgramNameResponse200>>;
    /**
     * ### Retrieves a paginated list of enrollments for a given program.
     *
     * @summary Get Loyalty Program Enrollments
     */
    loyaltyProgramController_getLoyaltyProgramEnrollments(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramEnrollmentsMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramEnrollmentsResponse200>>;
    /**
     * ### Creates a consent url for a user to enroll in a loyalty program.
     *
     * @summary Enroll User in Loyalty Program
     */
    loyaltyProgramController_enrollUserInLoyaltyProgram(body: types.LoyaltyProgramControllerEnrollUserInLoyaltyProgramBodyParam, metadata: types.LoyaltyProgramControllerEnrollUserInLoyaltyProgramMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerEnrollUserInLoyaltyProgramResponse201>>;
    /**
     * ### Creates a reward snapshot for a given program. Webhook will be sent once processing
     * is complete
     *
     * @summary Create Loyalty Program Rewards Snapshot
     */
    loyaltyProgramController_createLoyaltyProgramRewardSnapshot(body: types.LoyaltyProgramControllerCreateLoyaltyProgramRewardSnapshotBodyParam, metadata: types.LoyaltyProgramControllerCreateLoyaltyProgramRewardSnapshotMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerCreateLoyaltyProgramRewardSnapshotResponse201>>;
    /**
     * ### Retrieves a paginated list of reward snapshots for a given program.
     *
     * @summary Get Loyalty Program Rewards Snapshots
     */
    loyaltyProgramController_getLoyaltyProgramRewards(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramRewardsMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramRewardsResponse200>>;
    /**
     * ### Retrieve information about a specific reward snapshot
     *
     * @summary Get Loyalty Program Rewards Snapshot
     */
    loyaltyProgramController_getLoyaltyProgramRewardSnapshot(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramRewardSnapshotMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramRewardSnapshotResponse200>>;
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
    loyaltyProgramController_allocateLoyaltyProgramRewards(metadata: types.LoyaltyProgramControllerAllocateLoyaltyProgramRewardsMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerAllocateLoyaltyProgramRewardsResponse201>>;
    /**
     * ### Sends a transaction to transfer reward funds from the developer wallet to the
     * loyalty program wallet.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Fund Loyalty Program Rewards
     */
    loyaltyProgramController_fundLoyaltyProgramRewards(body: types.LoyaltyProgramControllerFundLoyaltyProgramRewardsBodyParam, metadata: types.LoyaltyProgramControllerFundLoyaltyProgramRewardsMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerFundLoyaltyProgramRewardsResponse201>>;
    /**
     * ### Sends a transaction to withdraw unallocated reward funds from the loyalty program
     * wallet to the developer wallet.
     *
     * Note: This action uses the developer wallet
     *
     * @summary Withdraw Loyalty Program Rewards
     */
    loyaltyProgramController_withdrawLoyaltyProgramRewards(body: types.LoyaltyProgramControllerWithdrawLoyaltyProgramRewardsBodyParam, metadata: types.LoyaltyProgramControllerWithdrawLoyaltyProgramRewardsMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramControllerWithdrawLoyaltyProgramRewardsResponse201>>;
    /**
     * ### Retrieves a summary of stats for a given program.
     *
     * @summary Get Loyalty Program Stats Summary
     */
    loyaltyProgramController_getLoyaltyProgramStatsSummary(metadata: types.LoyaltyProgramControllerGetLoyaltyProgramStatsSummaryMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramControllerGetLoyaltyProgramStatsSummaryResponse200>>;
    /**
     * ### Creates a consent url for a user to claim rewards for their enrollment from a
     * loyalty program.
     *
     * @summary Claim Rewards from Loyalty Program
     */
    loyaltyProgramEnrollmentsController_claimRewardsFromLoyaltyProgram(body: types.LoyaltyProgramEnrollmentsControllerClaimRewardsFromLoyaltyProgramBodyParam, metadata: types.LoyaltyProgramEnrollmentsControllerClaimRewardsFromLoyaltyProgramMetadataParam): Promise<FetchResponse<201, types.LoyaltyProgramEnrollmentsControllerClaimRewardsFromLoyaltyProgramResponse201>>;
    /**
     * ### Creates a consent url for a user to disenroll & withdraw their balance from a
     * loyalty program.
     *
     * @summary Disenroll User in Loyalty Program
     */
    loyaltyProgramEnrollmentsController_disenrollUserFromLoyaltyProgram(body: types.LoyaltyProgramEnrollmentsControllerDisenrollUserFromLoyaltyProgramBodyParam, metadata: types.LoyaltyProgramEnrollmentsControllerDisenrollUserFromLoyaltyProgramMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramEnrollmentsControllerDisenrollUserFromLoyaltyProgramResponse200>>;
    /**
     * ### Retrieve information about a specific enrollment
     *
     * @summary Get Loyalty Program Enrollment
     */
    loyaltyProgramEnrollmentsController_getLoyaltyProgramEnrollmentById(metadata: types.LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentByIdMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentByIdResponse200>>;
    /**
     * ### Retrieves a paginated list of all enrollments in the project.
     *
     * @summary Get Loyalty Program Enrollments
     */
    loyaltyProgramEnrollmentsController_getLoyaltyProgramEnrollmentsByProject(metadata: types.LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentsByProjectMetadataParam): Promise<FetchResponse<200, types.LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentsByProjectResponse200>>;
    /**
     * ### Creates a new Stackable Asset.
     *
     * @summary Create Stackable Asset
     */
    stackableAssetController_createStackableAsset(body: types.StackableAssetControllerCreateStackableAssetBodyParam, metadata: types.StackableAssetControllerCreateStackableAssetMetadataParam): Promise<FetchResponse<201, types.StackableAssetControllerCreateStackableAssetResponse201>>;
    /**
     * ### Issue some quantity of a Stackable Asset to a User.
     *
     * @summary Issue Stackable Asset(s)
     */
    stackableAssetController_issueAsset(body: types.StackableAssetControllerIssueAssetBodyParam, metadata: types.StackableAssetControllerIssueAssetMetadataParam): Promise<FetchResponse<201, types.StackableAssetControllerIssueAssetResponse201>>;
    /**
     * ### Updates a 'Stackable Asset'.
     *
     * Provide attributes that will override the current asset's attributes. Please note that
     * any attributes not specified will be deleted from the existing asset.
     *
     * @summary Update Stackable Asset
     */
    stackableAssetController_updateAsset(metadata: types.StackableAssetControllerUpdateAssetMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * ### Get a paginated list of all Crafting Recipes
     *
     * @summary Get All Crafting Recpies
     */
    craftingRecipesController_getAll(metadata: types.CraftingRecipesControllerGetAllMetadataParam): Promise<FetchResponse<200, types.CraftingRecipesControllerGetAllResponse200>>;
    /**
     * ### Create a new Crafting Recipe.
     *
     * @summary Create Crafting Recipe
     */
    craftingRecipesController_create(body: types.CraftingRecipesControllerCreateBodyParam, metadata: types.CraftingRecipesControllerCreateMetadataParam): Promise<FetchResponse<201, types.CraftingRecipesControllerCreateResponse201>>;
    /**
     * ### Get details about a single crafting recipe.
     *
     * @summary Get Crafting Recipe
     */
    craftingRecipesController_get(metadata: types.CraftingRecipesControllerGetMetadataParam): Promise<FetchResponse<200, types.CraftingRecipesControllerGetResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
