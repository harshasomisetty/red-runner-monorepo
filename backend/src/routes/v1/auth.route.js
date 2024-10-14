const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/registerOrLogin', validate(authValidation.registerOrLogin), authController.registerOrLogin);
router.post('/wallet-login', validate(authValidation.walletLogin), authController.walletLogin);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/registerOrLogin:
 *   post:
 *     summary: Register or Login as user. For Login email is not required, for Register email is required.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - email
 *               - tokenId
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               tokenId:
 *                 type: string
 *             example:
 *               userId: OjGkzAEpeRUSN2uJ0oGAYsx2hug2
 *               tokenId: eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYTI5YTUyMTJkOWI5NmYzNjc1NTA0ZjYyYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHVtbXktZjEzYzciLCJhdWQiOiJkdW1teS1mMTNjNyIsImF1dGhfdGltZSI6MTcyMzA2MjU4NCwidXNlcl9pZCI6Ik9qR2t6QUVwZVJVU04ydUowb0dBWXN4Mmh1ZzIiLCJzdWIiOiJPakdrekFFcGVSVVNOMnVKMG9HQVlzeDJodWcyIiwiaWF0IjoxNzIzMDYyNTg0LCJleHAiOjE3MjMwNjYxODQsImVtYWlsIjoidW1hckBjbHYuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVtYXJAY2x2LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.okyTP_bJ5CJyN9I9023w8-KPahR06Pogbzl-gEaDtRRYjlKPhJU875uq9A_mVkcP2RJMZNuIUBNjwUAvsfpLO8MZBHyjFdYnIsNq-pjqlPJJDdiXORqOCfQzTYR0tlFTGhBhGd8ADvvFkxSuD94CKxIcZXr56lS8nQY9-FSI5xuQi2lsbnGHk4fykxQ0C9Wr6nhBcnRc_uIUWtgJV0giuGZ8WkEtknSdxW-UFFDRTCQRMVcn6z38VE6qqk9-loC6P-i0Gzh31GrCv5sdNxWeeaJwaJaNN7aG8Fwe7Su_HVIB7mFpcuRySAwyHjGHj_WUSamlRgx7X_i5B-5YUBYFLQ
 *               email: umar@clv.com
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
