const express = require('express');
const controller = require('../../controllers/realState.controller');

const router = express.Router();


router.route('/')
  .get(controller.list)
  .post(controller.create);

module.exports = router;
