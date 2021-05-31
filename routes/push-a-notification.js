const webpush = require('web-push');
const getSubscribersFromDb = require("../db/subscribers").getSubscribersFromDb;
const vapidKeys = {
"publicKey":"BBobCiHo-HhUnv1pXD0hRGGgnEGiWfPVxSiRnfHw3M6b2e3AV4Qt0xhca5vdU5y948cgXms50iYo44CxZjosM-g",
"privateKey":"_lBAscu8yF0mzW51N0LOGzsnpOBQXrNADJIUaOjguas"
}

webpush.setVapidDetails(
    'mailto:ezouras@hotmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
pushNotification= (req, res) => {
  const message = req.body.message;
  console.log('Received message to push: ', message);

      const allSubscriptions = getSubscribersFromDb();
      console.log('Total subscriptions', allSubscriptions.length);

      const notificationPayload = {
          "notification": {
              "title": "EZ Push Notification",
              "body": message,
              "icon": "public/assets/pinkButterfly.png",
              "vibrate": [100, 50, 100],
              "data": {
                  "dateOfArrival": Date.now(),
                  "primaryKey": 1
              },
              "actions": [{
                  "action": "explore",
                  "title": "Go to the site"
              }]
          }
      };

      Promise.all(allSubscriptions.map(sub =>
          {
            console.log("in promise - subscription is: ",sub);
            webpush.sendNotification(sub, JSON.stringify(notificationPayload))
            .then(() => res.status(200).json({message: 'pushed message successfully!'}))
            .catch(err => {
              console.error("Error sending notification, reason: ", err);
              res.sendStatus(500);
          });
      }));
}


exports.pushNotification = pushNotification;
