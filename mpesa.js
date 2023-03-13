const router = require("express").Router();
const Mpesa = require("mpesa-api").Mpesa;
require("dotenv").config()


router.post("/payment",(req,res)=>{
    const credentials = {
        clientKey: process.env.KEY,
        clientSecret: process.env.SECRET,
        initiatorPassword: process.env.initiatorPassword,
        securityCredential: process.env.securityCredential,
        certificatePath: process.env.certificatePath
    };
    const environment = "production";
    mpesa.lipaNaMpesaOnline({
      BusinessShortCode: 123456,
      Amount: 1000 /* 1000 is an example amount */,
      PartyA: "Party A",
      PhoneNumber: "Phone Number",
      CallBackURL: "CallBack URL",
      AccountReference: "Account Reference",
      passKey: "Lipa Na Mpesa Pass Key",
      TransactionType: "Transaction Type" /* OPTIONAL */,
      TransactionDesc: "Transaction Description" /* OPTIONAL */,
    })
    .then((response) => {
      //Do something with the response
      //eg
      console.log(response);
    })
    .catch((error) => {
      //Do something with the error;
      //eg
      console.error(error);
    });
    const mpesa = new Mpesa(credentials, environment);
});

module.exports = router;