var config= require("../config/config");

var fetchModel= require("fetch");
var user= require("../../main-page").user;
var observableModule = require("data/observable");

function authSystem (info){
    info = info || {};
    var viewModel = new observableModule.fromObject({
        username: info.username || "",
        password: info.password || ""
    });
    viewModel.login= function (users){
      var userName= users.username;
      var passWord=users.password;
      viewModel.username= userName;
      if(userName === "ammar"){
          if(passWord === "1234"){
              return "welcom";
          }
          return "wrong password";
      }
      return "we do not have this user" ;
    }
    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports= authSystem;