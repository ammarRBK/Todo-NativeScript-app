var manager= require('../share/view-models/tasksManager');
var dialogsModule=require("ui/dialogs");
var observableModule= require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

var tasks=  manager([{task:"drink water","date":"Invalid date","time":"02:25 pm","task_id":2,"user_id":5,"createdAt":"2018-02-27 23:23:34","updatedAt":"2018-02-27 23:23:34"},{task:"Fdsfgfd","date":"2018-03-02 12:41:11","time":"02:25 pm","task_id":11,"user_id":5,"createdAt":"2018-03-02 12:41:11","updatedAt":"2018-03-02 12:41:11"}]);
var page, errorMessage;

var pageInfos= new observableModule.fromObject({
    tasks: new ObservableArray([
                {city:"Madrid", distance:"0.2km",votes:"0"},
                {city:"Madrid", distance:"0.2km",votes:"0"},
                {city:"Madrid", distance:"0.2km",votes:"0"}
            ])
})

exports.gitInfo= function (args) {
    // pageInfos.set("busy", true);
    // tasks.load().then( function (){
    //     console.log("fldsklf;kdsl==========",pageInfos.tasks);
    //     pageInfos.set("busy", false)
    // })
    page= args.object;
    args.bindingContext= pageInfos;
}

exports.addNewTask= function ( ){
    var newTask= page.getViewById("newTask").text;
    if(newTask.trim() !== ""){
        tasks.add(newTask)
        .catch(function() {
            // dialogsModule.alert({
            //     title: "failed to add",
            //     message: "An error occurred while adding an item to your list.",
            //     okButtonText: "OK"
            // });
           pageInfos.set("errorMessage","An error occurred while adding an item to your list.");
        });
        page.getViewById("newTask").dismissSoftInput();
        page.getViewById("newTask").text="";
    }
    // dialogsModel.alert({
        //     title: "failed to add",
        //     message: "Please enter a Task",
        //     okButtonText: "cancel"
        // })
        console.log("kfojgoejfgkfj",newTask)
        pageInfos.set("errorMessage","Please enter a Task");
   
};
// var Observable = require("data/observable");
// var ObservableArray = require("data/observable-array").ObservableArray;

// function pageLoaded(args) {
//     var page = args.object;
//     page.bindingContext = pageData;
//     console.log(pageData.cities);
// }
// exports.pageLoaded = pageLoaded;

// var pageData = new Observable.fromObject({
//     cities: new ObservableArray([
//         {city:"Madrid", distance:"0.2km",votes:"0"},
//         {city:"Madrid", distance:"0.2km",votes:"0"},
//         {city:"Madrid", distance:"0.2km",votes:"0"}
//     ])
// })
