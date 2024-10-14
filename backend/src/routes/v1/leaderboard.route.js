const express = require('express');
const validate = require('../../middlewares/validate');
const leaderBoardValidation = require('../../validations/leaderboard.validation');
const { leaderBoardController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(
  '/addEntry',
  validate(leaderBoardValidation.AddLeaderboardEntry),
  auth(),
  leaderBoardController.AddLeaderboardEntry
);
router.get('/getLeaderboard', auth(), leaderBoardController.GetLeaderBoardEntries);
router.get('/getLeaderboardNoAuth', leaderBoardController.GetLeaderBoardEntriesNoAuth);
router.get('/getRelativeRank', auth(), leaderBoardController.GetRelativeRanks);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard management
 */

/**
 * @swagger
 * /leaderboard/addEntry:
 *   post:
 *     summary: Add a new leaderboard entry
 *     tags: [Leaderboard]
 *     parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *        type: string
 *        required: true
 *        description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *             properties:
 *               score:
 *                 type: number
 *             example:
 *               score: 100
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 score:
 *                   type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /leaderboard/getLeaderboard:
 *   get:
 *     summary: Get the top 10 leaderboard entries
 *     tags: [Leaderboard]
 *     parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *        type: string
 *        required: true
 *        description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
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
 *                   userId:
 *                     type: string
 *                   score:
 *                     type: number
 *                   name:
 *                     type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /leaderboard/getRelativeRank:
 *   get:
 *     summary: Get the relative rank for a user
 *     tags: [Leaderboard]
 *     parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *        type: string
 *        required: true
 *        description: UserId (Firebase UID)
 *     security:
 *       - bearerAuth: []
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
 *                   userId:
 *                     type: string
 *                   score:
 *                     type: number
 *                   name:
 *                     type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
