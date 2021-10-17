const User = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { adminSchema } = require("../validator/adminValidator");
const jwt = require("jsonwebtoken");

module.exports.get_detail = async (req, res) => {
  try {
    const member = await User.find({});
    res.status(201).json({ user: member });
  } catch (err) {
    res.status(400).json({ message: "User exists" });
  }
};
module.exports.get_detailbyId = async (req, res) => {
  try {
    const member = await User.find({ _id: req.params.id });
    res.status(201).json({ user: member });
  } catch (err) {
    res.status(400).json({ message: "User doesn't exists" });
  }
};
module.exports.upd_put = async (req, res) => {
  const { Applicants } = req.body;
  const id = req.params.id;
  try {
    const query = { _id: id };
    const updateDocument = {
      domain: Applicants.domain,
    };
    const data = await User.updateOne(query, updateDocument);
    const result = await User.findById(id);
    res.status(200).json({ result });
  } catch (e) {
    res.status(400).json({ message: "Error while updating" });
  }
};

module.exports.form_post = async (req, res) => {
  const { name, branch, registrationNo, year, mobileNo, emailId, domain } =
    req.body;
  try {
    const member = await User.create({
      name,
      branch,
      registrationNo,
      year,
      mobileNo,
      emailId,
      domain,
    });
    res.status(201).json({ message: "Successfully registered", user: member });
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { password } = req.body;
    // await adminSchema.validateAsync({ password: password });
    if (password === process.env.PASS) {
      const token = jwt.sign(
        {
          password: password,
        },
        "secret",
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        message: "Admin logeed in",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
module.exports.email_post = async (req, res) => {
  const { email } = req.body;
  const uuid = Math.floor(1000 + Math.random() * 9000);
  try {
    const user = await User.findOne({ emailId: email });
    if (user) {
      async function main() {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          // SES: new aws.SES({
          //   apiVersion: "2010-12-01",
          // }),
          // sendingRate: 1,
          pool: true,
          service: "gmail",
          // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        let info = await transporter.sendMail({
          from: process.env.EMAIL, // sender address
          to: user.emailId, // list of receivers
          subject: "Recruitment", // Subject line

          html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
          <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
            
              <style type="text/css">
                a { color: #0000ee; text-decoration: underline; }
          @media only screen and (min-width: 620px) {
            .u-row {
              width: 600px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
          
            .u-row .u-col-100 {
              width: 600px !important;
            }
          
          }
          
          @media (max-width: 620px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: calc(100% - 40px) !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
          
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
          
          p {
            margin: 0;
          }
          
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
          
          * {
            line-height: inherit;
          }
          
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
          
          </style>
            
            
          
          <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
          
          </head>
          
          <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff">
          Here is ur PIN         
          <h1>${uuid}</h1>
          </body>
          
          </html>
          `,
          // plain text body
          // html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        //}

        // send mail with defined transport object
      }
      main().catch(console.error);
      res.status(200).json({ messsage: "Mail sent", user: user, uuid });
    } else {
      throw "unable to send mail";
    }
  } catch (err) {
    res.status(400).json({ error: "User Not found", message: err });
  }
};
