var Client = require('coinbase').Client;

var client = new Client({
  'apiKey': 'xN5h9TfOKmS6GB4o',
  'apiSecret': 'xwPMH9BBG1sxx9uWYwAsZS3AxnxioxtF',
});

var rValue;

//Create a new wallet for a project
function createAcct(project_name){
  client.createAccount({'name': project_name}, function(err, acct) {
    rValue = acct.id;
  });

}

console.log(createAcct("Wallet 2"));

//Delete a wallet after a project is over or canceled
function delAcct(id){
  client.getAccount(id, function(err, acct) {
      acct.delete(function(err, resp) {});
  });
}

//Function to get balance (in BTC)
function getBalance(id){
  client.getAccount(id, function(err, acct) {
      rValue = acct.balance.amount;
  });
}

//Function to get balance (in USD)
function getNativeBalanceN(id){
  client.getAccount(id, function(err, acct) {
      rValue = acct.native_balance.amount;
  });
}

//Function to get time wallet was created
function getStart(id){
  client.getAccount(id, function(err, acct) {
      rValue = acct.created_at;
  });
}

//Send money from our account to a user
function sendBit(acct_id,to_address,amount){
  client.getAccount(acct_id,function(err, acct) {
    acct.sendMoney({'to': to_address,
                     'amount': amount,
                     'currency': 'USD'},
                     function(err, tx) {
      });
  });
}

//Request money from a given email address
function requestBit(acct_id,email,amount){
  client.getAccount(acct_id,function(err, acct) {
    acct.requestMoney({'to': email,
                        'amount': amount,
                        'currency': 'USD'}, function(err, tx) {
      });
  });
}

function getValue() {
  return rValue;
}
