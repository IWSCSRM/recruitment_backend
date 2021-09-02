const { Router } = require("express");
const formController = require("../controllers/formController");
const router = Router();
const nodemailer = require("nodemailer");


router.post("/form", formController.form_post);
router.post("/emailProcess", formController.email_post);
router.get("/getDetail", formController.get_detail);
router.put("/updateAdm", formController.upd_put);
router.post("/login",formController.login);
module.exports = router;
