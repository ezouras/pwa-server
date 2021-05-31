const addSubscriber = require("../db/subscribers").addSubscriber;


addPushSubscriber = (req, res) => {
  const sub = req.body;
  console.log('Received Subscription on the server: ', sub);
  addSubscriber(sub);
  
  //res.send(JSON.stringify({message:"post worked!"}));
  res.status(200).json({
    message: "Subscription added successfully."
  });
}

exports.addPushSubscriber = addPushSubscriber;
