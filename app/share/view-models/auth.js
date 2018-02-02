var config= require("../config/config");

var fetchModel= require("fetch");
var user= require("../../main-page").user;
var observableModule = require("data/observable");

function authSystem (info){
    info = info || {};
    var viewModel = new observableModule.fromObject({
        username: info.username || "",
        password: info.password || "",
        errorMassage:""    
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
    };

    viewModel.users= [{username:"ammar",password:"1234"}];

    viewModel.signup= function (){
        var newName= viewModel.get("username");
        var newPassword= viewModel.get("password");
        for(var i=0; i<viewModel.users.length; i++){
            if(viewModel.users[i].username === newName){
                return viewModel.get("errorMassage")= "Existing user retry with new username";
            }
            viewModel.users.push({
                username:newName,
                password:newPassword
            });
            return "added user done";
        }
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