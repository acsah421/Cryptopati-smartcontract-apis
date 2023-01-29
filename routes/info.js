require("dotenv").config();
const express = require("express");
const Tx = require("ethereumjs-tx").Transaction;
const router = express.Router();
const { answerQuestion } = require("../modules/answerQuestion");

router.get("/answerQuestion", answerQuestion);

module.exports = router;
