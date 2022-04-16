const accountSid = 'ACf52aa5f107142e3b40b8c4458846f87a'; 
const authToken = `039ab11107549314a36757eccc98be53`; 
const client = require('twilio')(accountSid, authToken); 
 
// client.messages 
//       .create({ 
//          body: 'Kontol Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/', 
//          from: 'whatsapp:+14155238886',       
//          to: 'whatsapp:+6282139987938' 
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();
module.exports = client



    //   {
    //     "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     "api_version": "2010-04-01",
    //     "body": "Hello, there!",
    //     "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
    //     "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
    //     "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
    //     "direction": "outbound-api",
    //     "error_code": null,
    //     "error_message": null,
    //     "from": "whatsapp:+14155238886",
    //     "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     "num_media": "0",
    //     "num_segments": "1",
    //     "price": null,
    //     "price_unit": null,
    //     "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     "status": "sent",
    //     "subresource_uris": {
    //       "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
    //     },
    //     "to": "whatsapp:+15005550006",
    //     "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
    //   }