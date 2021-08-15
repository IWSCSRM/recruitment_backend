const express = require("express");
const router = express.Router();

const formRoutes = require("./formRoutes");

router.use(formRoutes);

module.exports = router;
