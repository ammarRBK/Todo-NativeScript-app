var config= require("../config/config").url;
var dialogsModule = require("ui/dialogs");
var fetchModel= require("fetch");
var user= require("../../main-page").user;
var observableModule = require("data/observable");
var frameModule= require("ui/frame");

var comminucationVar="";

function authSystem  (info){
    info = info || {};
    var viewModel = new observableModule.fromObject({
        username: info.username || "",
        password: info.password || "",
        errorMassage:"",
        comminucationVar:comminucationVar    
    });
    
    viewModel.login= function (users){
      var userName= users.username;
      var passWord=users.password;
      
    return fetchModel.fetch(config + "login",{
        method: "POST",
        body:JSON.stringify({
            username:userName,
            password:passWord
        }),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .catch(handleErrors)
    // console.log('Success:', response.password)
    .then(data => {
        console.log(data);
        if(data.username){
            if(data.password === passWord){
                console.log("--------------> welcom "+"\n"+data.password)
                dialogsModule.alert({
                    title: "success login",
                    message:"welcome to your todoList",
                    okButtonText:"ok"
                })
                var topmost= frameModule.topmost();
                topmost.navigate("./todos/todos");
            }
            console.log("-------------------->"+"\n"+"wrong password")
            dialogsModule.alert({
                title: "field login",
                message:"wrong password",
                okButtonText:"ok"
            })
            return Promise.reject()
        }else {
            alert("wrong username")
        }
    })
    // .then(handleErrors)
    // .then(function(response) {
    //     response.json();
    // })
    // .then(function(data) {
    //     
};

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
    console.log("0909080",response)
    return response;
}

module.exports= authSystem;