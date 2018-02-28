var manager= require('../share/view-models/tasksManager')(tasksArray);
var dialogsModel= require('ui/dialogs');
var observableModule= require("data/observable");
var ObservableArray= require("data/observable-array").ObservableArray;

var page, errorMessage;
var tasksArray= [];
var pageInfos= new observableModule.fromObject({
    errorMessage: errorMessage,
    tasks: manager,
    task: ""
})

exports.gitInfo= function ( args ) {
    page= args.object;

    args.bindingContext= pageInfos;
    pageInfos.set("busy", true);
    manager.load().then( () =>{
        pageInfos.set("busy", false)
    })
}

exports.addNewTask= function ( ){
    console.log(page.getViewById("newTask").text)
    if(page.getViewById("newTask").text === ""){
        // dialogsModel.alert({
        //     title: "failed to add",
        //     message: "Please enter a Task",
        //     okButtonText: "cancel"
        // })
        errorMessage= "Please enter a Task";
    }
    var newTask= page.getViewById("newTask").text;
    manager.add(newTask)
    .catch(function() {
        // dialogsModule.alert({
        //     title: "failed to add",
        //     message: "An error occurred while adding an item to your list.",
        //     okButtonText: "OK"
        // });
        errorMessage= "An error occurred while adding an item to your list.";
    });
    page.getViewById("newTask").dismissSoftInput();
    pageInfos.set("taskField","");
};
