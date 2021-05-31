let user_subscriptions = [];

getSubscribersFromDb=()=>{
  return user_subscriptions;
}

addSubscriber=(sub)=>{
  console.log("adding subscriber to db")
  user_subscriptions.push(sub)
}

exports.getSubscribersFromDb = getSubscribersFromDb;
exports.addSubscriber = addSubscriber;
