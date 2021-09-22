import {updateTask,createTask,deleteTask,finishedTask} from './task.js';
import {checkForDue} from './duetask.js'

document.addEventListener('DOMContentLoaded', function(event){
    
    
    function getData(){
        //ajax of fetch to get data from storage
        let date = new Date().toDateString();
        let data = {"todo":{},
                    "done":{},
                    "previous":{}};
        data["todo"][date] = [{"task":"do something","duration":"","due":new Date().toISOString()},
        {"task":"do something else","duration":"","due":new Date().toISOString()},
        {"task":"do something too","duration":"","due":new Date().toISOString()}]
        return data
    }
    
    let data = getData();
        
    console.log("here",data)//

    const cards = document.querySelector(".cards");
    const todaysDate = new Date().toDateString();
    


    if (typeof data =="object" && "todo" in data){
        for (let key in data["todo"]){
            //write data to screen
            data["todo"][key].forEach(function(each){
                cards.appendChild(createTaskMarkUp(each));            
            });
        }
    }


    addFinishedEvent(todaysDate);

    const createTodo = document.querySelector("#create-task");
    const addTask = document.querySelector("#add-task");
    const createForm = document.querySelector("#create-form");

    addTask.addEventListener("click", function(e){
        createForm.classList.toggle("fadeIn");
    });

    //create task
    createTodo.addEventListener('click', function(e){
        e.preventDefault();// stop browser from reloading

        const taskTitle = document.querySelector("#task-title");
        const due = document.querySelector("#due");
        //check if user filled form 
        if(taskTitle.value !== "" && due.value !==""){
            data = createTask(data,taskTitle.value,due.value);//call to create task
            cards.prepend(createTaskMarkUp(data["todo"][todaysDate][0]));
            addFinishedEvent();
            createForm.classList.remove("fadeIn");
            //updateData();
        }
    });


    function createTaskMarkUp(data){
        const card= document.querySelector("#card");
        const check = card.querySelector(".check");
        const innerCard = card.querySelector(".inner-card");
        const newDiv = document.createElement("div"); 
        const clonedCheck = check.cloneNode(true);
        const clonedInnerCard = innerCard.cloneNode(true);
    
        const cardheader = clonedInnerCard.querySelector(".card-header");
        cardheader.innerHTML = data.task;
        
        const time = clonedInnerCard.querySelector(".timestamp");
        const dateCreatedDiv = document.createElement("div");
        dateCreatedDiv.setAttribute("style","display:none;");
        dateCreatedDiv.setAttribute("class","date-created");
        dateCreatedDiv.innerHTML = data.due;
        time.innerHTML = /(\d{2}:\d{2})/.exec(data.due)[1];//get the time only
        time.appendChild(dateCreatedDiv);

        newDiv.setAttribute("class","card");
        newDiv.append(clonedCheck,clonedInnerCard);
        return newDiv;
    }


    function addFinishedEvent(){
        const todaysDate = new Date().toDateString();
        let done = document.querySelectorAll("#done");//get all checkbox with done

        done.forEach(function(element){
            //add event listerner to each checkbox with id done
            element.addEventListener("change",function(){
                if(element.checked){
                    //on check if element is checked add task to completed task, deletes it from todo and
                    const checkSibling = element.parentElement.nextSibling;
                    const task = checkSibling.querySelector(".card-header").innerHTML;
                    const due = checkSibling.querySelector(".timestamp").innerHTML;
                    const currentCard=element.parentElement.parentElement;
                    let taskCompleted = false;
                    
    
                    data["todo"][todaysDate].forEach(function(each){
                        const dueTestReg = new RegExp("("+ due +")");
                        if(each.task === task && dueTestReg.test(each.due)){
                            let response = finishedTask(data,each);
                            if(typeof response === "object"){
                                data = response;
                                taskCompleted = true;
                            }
                        }
                    });
    
                    //delete task from todo
                    if(taskCompleted){
                        let response = deleteTask(data,task,due);
                        if (typeof response === "object") data = response;
                    }
    
                    cards.removeChild(currentCard);
                    // uploadData();
                }
            });
        });
    }



    //check for task due at every 1 second interval
    setInterval(() => {checkForDue(data)},1000);
});


