var submitAuth= require("../share/view-models/auth");

var upFunction= new submitAuth();

var dialogsModel= require("ui/dialogs");
var observableModule= require("data/observable")
const frameModule = require("ui/frame");

exports.isLoaded= function(args){
    page= args.object;

    page.bindingContext= upFunction;
}



exports.signup= function (){
    var func=upFunction.signup(); 
    if(func === "Existing user retry with new username"){
        throw Error(response.statusText);
    }
    dialogsModel.alert({
        message: "Welcom between us",
        okButtonText: "ok"
    })
    const topmost = frameModule.topmost();
   topmost.navigate("main-page");
}