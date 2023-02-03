const fast2sms = require("fast-two-sms");
var options = {
  authorization:
    "Ywa9Bjl7E6RJmMKvUPsHd1FGV2Qxi04yfWTuZbntckqICN8ApO5rHL2PaiCvx7RFAUoKznOkgfsQ4WDM",
  message: "otp ",
  numbers: ["9901145387", "7204719300"],
};

// function send() {
//   fast2sms
//     .sendMessage(options)
//     .then((response) => {
//       //   console.log("sucessfully sent message: " + response);
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

async function smsSend(options) {
  const response = await fast2sms.sendMessage(options);
  console.log("response", response);
  if (response.return === true) {
    console.log("first");
  }
}
smsSend(options);
