const express = require('express');
const validate = require('../../middlewares/validate');
const {gsValidation} = require('../../validations');
const {gsHooksController} = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/assetMinting',validate(gsValidation.webHook),gsHooksController.AssetMintingHook);
router.post('/payments',validate(gsValidation.webHook),gsHooksController.PaymentsHook);
router.post('/payouts',validate(gsValidation.webHook),gsHooksController.PayoutHooks);
router.post('/marketPlace',validate(gsValidation.webHook),gsHooksController.MarketplaceHooks);

module.exports = router;
