const getSubscribersFromDb = require("../db/subscribers").getSubscribersFromDb;


getSubscribers = (req, res) => {
  console.log('Received get Subscribers request');
  subscribers = getSubscribersFromDb();
  //message is either an array or an object
  message = subscribers.length > 0 ? subscribers :[];
  console.log("message is: ", message)

  //res.send(JSON.stringify({message:"post worked!"}));
  res.status(200).json(message);
}

exports.getSubscribers = getSubscribers;
