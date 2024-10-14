const express = require('express');
const {shopValidation} = require('../../validations');
const {shopController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/getShopData',auth(), shopController.getShopData);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: Shop related operations
 */

/**
 * @swagger
 * /shop/getShopData:
 *   get:
 *     summary: Get Shop Data
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId (Firebase UID)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shopData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
