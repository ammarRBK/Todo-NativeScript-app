var Observable = require("data/observable").Observable;
var config= require("./share/config/config").url;
var frameModel= require("ui/frame");
function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }
    viewModel.checkIsloggedIn= function(){
        return fetch(config+'/checkLoggedIn',{
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .catch(res =>{
            console.log("You are not logged in");
        }).then(data =>{
            if(data !== "ok"){
                frameModel.topmost().navigate("main-page");
            }
            frameModel.topmost().navigate("todos/todos");
        })
    };

    return viewModel;
}

exports.createViewModel = createViewModel;