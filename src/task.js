export function createTask(data ={},task="",due=""){
    const today = new Date().toDateString();
    const validateDateString = /^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}$/.test(due);


    //if not a valid date string fail silently
    if(validateDateString){
        if (today in data["todo"]){
            data["todo"][today].unshift({task,due});
        }
        else{
            data["todo"][today] = [{task,due}];
        }
    }
    return data
}


export function updateTask(data={}, task="",due="",dateString=""){
    const validateDateString = /^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.(\d+)Z$/.test(dateString);
    
    if(validateDateString){
        const taskDate = new Date(dateString).toDateString();
        data[taskDate].forEach(function(each){
                if(each.task === task){
                    each["task"] = task;
                    each["duration"] = duration;
                    each["due"] = due;
                    return data;
                }
        });
        return "didnt find task"
    }
    else{
        return "no such task exist"
    }
}

export function deleteTask(data={},task="",due=""){
    /*loop through list, if task is same as object task? delete task:return did'nt find task*/

    const taskDate = new Date().toDateString();
    const dueReg = new RegExp("("+due+")");
    
    data["todo"][taskDate].forEach(function(each){
        if(each.task === task && dueReg.test(each.due)){
            let taskIndex = data["todo"][taskDate].indexOf(each);
            data["todo"][taskDate].splice(taskIndex,1);
            return data;
        }
        else{
            return "didnt find task"
        }
    });
    
}


export function finishedTask(data,task){
    const today = new Date().toDateString(); 

    if(typeof task == "object"){
        if(today in data["done"]){
            data["done"][today].unshift(task);
        }
        else{
            data["done"][today] = [task];
        }
        return data;
    }else{
        return "object expected"
    }
}
