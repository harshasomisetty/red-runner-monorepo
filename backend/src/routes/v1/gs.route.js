const express = require('express');
const validate = require('../../middlewares/validate');
const gsValidation = require('../../validations/gs.validation');
const gsController = require('../../controllers/gs.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/getWalletAddress',auth(), gsController.getUserWalletAddress);
router.post('/getInventory',validate(gsValidation.fetchInventory),auth(), gsController.getUserInventory);
router.post('/getMarketPlace',validate(gsValidation.fetchMarketPlace),auth(), gsController.GetMarketPlaceItems);
router.post('/mintAsset',validate(gsValidation.mintAsset),auth(), gsController.mintAssetToUser);
router.post('/buyItem',validate(gsValidation.buyItem),auth(), gsController.buyItem);
router.post('/claimCoins',validate(gsValidation.coinClaim),auth(), gsController.userClaimsCoins);
router.post('/transferSol',validate(gsValidation.transferSol),auth(), gsController.transferSolDevToUser);
router.post('/updateNft',validate(gsValidation.updateNft),auth(), gsController.updateUserAsset);
router.post('/withdraw',validate(gsValidation.withdrawFunds),auth(), gsController.withdrawFundsToAccount);
router.post('/listForSale',validate(gsValidation.assetListing),auth(), gsController.ListAssetForSale);
router.post('/cancelListing',validate(gsValidation.assetDeListing),auth(), gsController.DeListAssetForSale);
router.post('/buyItemFromMarket',validate(gsValidation.marketPlaceItemBuy),auth(), gsController.BuyAssetFromMarket);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GS
 *   description: GS related operations
 */

 /**
 * @swagger
 * /gs/getInventory:
 *   post:
 *     summary: Get user inventory
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               pageNumber:
 *                 type: integer
 *               types:
 *                 type: string
 *                 enum:
 *                  - UniqueAsset
 *                  - Currency
 *                 description: "Comma-separated list of asset types"
 *               forSale:
 *                 type: boolean
 *               collectionId:
 *                 type: string
 *             example:
 *               pageNumber: 1
 *               types: 'UniqueAsset,Currency'
 *               forSale: false
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /gs/mintAsset:
 *   post:
 *     summary: Mint asset to user
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *             example:
 *               itemId: 'speed_booster_10'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /gs/claimCoins:
 *   post:
 *     summary: Claim Coins At End Of Game
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             example:
 *               quantity: 10
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /gs/buyItem:
 *   post:
 *     summary: Buy an Item using either normal USDC or SOL
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               currencyId:
 *                 type: string
 *                 enum: ['USDC','SOL']
 *             example:
 *               itemId: 'speed_booster_10'
 *               currencyId: 'USDC'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /gs/updateNft:
 *   post:
 *     summary: Update an NFT with new uses left
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               assetId:
 *                 type: string
 *               usesLeft:
 *                 type: integer
 *             example:
 *               itemId: 'double_jump_10'
 *               assetId: '506fee8a-2ccd-4f00-89a5-a659acf3dfa1'
 *               usesLeft: 3
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /gs/transferSol:
 *   post:
 *     summary: Transfer Solana from developer wallet to user
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: float
 *                 lessThan: 0.1
 *             example:
 *               quantity: 0.1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /gs/withdraw:
 *   post:
 *     summary: Withdraw funds to user account
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: float
 *             example:
 *               quantity: 0.1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /gs/listForSale:
 *   post:
 *     summary: List an asset for sale
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               assetId:
 *                 type: string
 *               amount:
 *                 type: float
 *             example:
 *               assetId: '506fee8a-2ccd-4f00-89a5-a659acf3dfa1'
 *               amount: 0.1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /gs/cancelListing:
 *   post:
 *     summary: Cancel the listing of an asset
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               assetId:
 *                 type: string
 *             example:
 *               assetId: '506fee8a-2ccd-4f00-89a5-a659acf3dfa1'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /gs/buyItemFromMarket:
 *   post:
 *     summary: Buy an item from the marketplace
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               assetId:
 *                 type: string
 *             example:
 *               assetId: '506fee8a-2ccd-4f00-89a5-a659acf3dfa1'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /gs/getMarketPlace:
 *   post:
 *     summary: Get marketplace items
 *     tags: [GS]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           charset: utf-8
 *           schema:
 *             type: object
 *             properties:
 *               pageNumber:
 *                 type: integer
 *               types:
 *                 type: string
 *                 enum:
 *                  - UniqueAsset
 *                  - Currency
 *                 description: "Comma-separated list of asset types"
 *               collectionId:
 *                 type: string
 *             example:
 *               pageNumber: 1
 *               types: 'UniqueAsset,Currency'
 *               collectionId: '506fee8a-2ccd-4f00-89a5-a659acf3dfa1'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
