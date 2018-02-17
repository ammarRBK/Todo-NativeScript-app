var config= require("../config/config").url;

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

    viewModel.signupMessage="";
    viewModel.signup= function (newUser){
        return fetchModel.fetch(config + "adduser",{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type":"application/json"
            },
            async: false
        }).then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
           viewModel.signupMessage= data; 
        });
        // var newName= viewModel.get("username");
        // var newPassword= viewModel.get("password");
        // for(var i=0; i<viewModel.users.length; i++){
        //     if(viewModel.users[i].username === newName){
        //         return viewModel.get("errorMassage")= "Existing user retry with new username";
        //     }
        //     viewModel.users.push({
        //         username:newName,
        //         password:newPassword
        //     });
        //     return "added user done";
        // }
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