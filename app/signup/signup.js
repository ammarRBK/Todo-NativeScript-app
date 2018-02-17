var submitAuth= require("../share/view-models/auth");

var upFunction= new submitAuth();

var dialogsModel= require("ui/dialogs");
var observableModule= require("data/observable")
const frameModule = require("ui/frame");

var page;

exports.isLoaded= function(args){
    page= args.object;

    page.bindingContext= upFunction;
}



exports.signup= function (){
    
    var username= page.getViewById("username").text;
    var password= page.getViewById("password").text;
    upFunction.signup({username:username,password:password}).then( ()=> {
        if(!newUser){
        throw Error("fill the user");
    }
    dialogsModel.alert({
        message: "Welcom between us",
        okButtonText: "ok"
    })
    const topmost = frameModule.topmost();
    topmost.navigate("main-page");
    }).catch(err => {
        if(upFunction.signupMessage === "Oops can not save the user because"){
        dialogsModel.alert({
            message: "we cnnot make your user",
            okButtonText: "cancel"
        })
    }
    dialogsModel.alert({
        message: "Welcom between us",
        okButtonText: "ok"
    })
    const topmost = frameModule.topmost();
    topmost.navigate("main-page");
    })
}   