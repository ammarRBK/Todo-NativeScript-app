var config= require("../config/config").url;
var observableModule= require("data/observable");
var ObservableArray= require("data/observable-array").ObservableArray;

function tasksManager (item) {
    var viewModel= new ObservableArray(item);
    viewModel.add= function(newItem) {
        return fetch(config +"addTask",{
            method: 'POST',
            body: JSON.stringify({
                task: newItem
            }),
            headers:{
                "Content-Type":"application/json"
            }
            }).then(res => res.json())
            .catch(res => {
                return res;
            })
            .then(data => {
                console.log(data)
                viewModel.push({task:data.task,taskId:data.id});
            })
    };

    viewModel.load= function (){
        return fetch(config+ 'getTasks',{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .catch(err => {
            return "nothing to view";
        })
        .then(data => {
            data.forEach(element => {
                console.log(element);
                viewModel.push({task:element.task,taskId:element.task_id});
                console.log(viewModel);
            });
        })
    };

    viewModel.edit= function(oldItem) {

    };

    viewModel.delete= function(item) {

    };
    return viewModel;
};

module.exports= tasksManager;