    // TODO: remove all tasks and all done tasks
    // TODO: buttons don't work correctly
    // TODO: it should do something when user click on tasks
    // TODO: create an tooltip for when input is invalid
    // TODO: fix long string and short width problem
    // TODO: single sort button with least detail
    // TODO: return done tasks when click on them again
    // TODO: change color by click


const addTaskBtn = document.getElementById("add-task")
const addTaskContainer = document.getElementById("add-task-container")
const inputTask = document.getElementById("input-task")
const taskContainer = document.getElementById("task-container")
const taskButtons = document.querySelectorAll(".remove")
const doneTasksContainer = document.querySelector(".done-tasks-container")

let tasks = []


const saveTask  = ()=>{
    const value = inputTask.value.trim();
    if(value){
        const task = document.createElement('div');
        const taskSpan = document.createElement('span');
        taskSpan.innerText = value;
        taskSpan.classList.add("task-span");
        task.appendChild(taskSpan)
        task.classList.add("task")
        task.appendChild(createButtons());
        taskContainer.appendChild(task)
        taskContainer.classList.add("active")
        tasks.push({
            order: tasks.length+1,
            task: task,
            done: false
        })
        taskContainer.appendChild(doneTasksContainer)
        clickAddBtn(true)
    }
    
   else{
       clickAddBtn(false)
    }
    inputTask.value=null;
}
const createButtons = ()=>{
    const buttons = document.createElement("div")
    buttons.classList.add("buttons")
    const done = document.createElement("i")
    done.classList.add("fa-solid", "fa-check", "done")
    buttons.appendChild(done)
    const remove = document.createElement("i");
    remove.classList.add("fa-solid", "fa-trash", "remove");
    buttons.appendChild(remove)
    return buttons
}
const makeItDone = (target)=>{
    const className = target.classList.contains("done")? ".done":".return";
    const done = document.querySelectorAll(className);
            done.forEach((value)=>{
                if (value===target){
                    const doneTask = value.parentElement.parentElement;
                    tasks.forEach((input)=>{
                        if (input.task === doneTask){
                            input.done= !input.done;
                        }
                    })
                    doneTask.classList.toggle("done-task")
                    const btn = doneTask.querySelector(".done")
                        btn.classList.toggle("fa-check")
                        btn.classList.toggle("fa-rotate-left")
                        // btn.classList.toggle("done")
                        btn.classList.toggle("return")
                    console.log(btn);
                }
            })
}
const makeItRemoved = (target)=>{
    const remove = document.querySelectorAll(".remove")
    remove.forEach((value)=>{
        if (value===target){
            const removedTask = value.parentElement.parentElement;
            tasks = tasks.filter((input)=>input.task!==removedTask)
            removedTask.remove()
                if (tasks.length==0){
                taskContainer.classList.toggle("active")
            }
        }
    })
}
const makeItOrdered = ()=>{
    for(const input of tasks){
        if (!input.done){
            taskContainer.appendChild(input.task)
        }
        else{
            doneTasksContainer.appendChild(input.task);
        } 
    }
    taskContainer.appendChild(doneTasksContainer)
}
const clickAddBtn = (hasText)=>{
    if (hasText){
        inputTask.classList.add("entred");
        addTaskBtn.classList.add("entred")
        setTimeout(()=>{
            inputTask.classList.remove("entred");
            addTaskBtn.classList.remove("entred");
        },100)
    }
    else{
            console.log("here");
            if (!addTaskBtn.classList.contains("not-working")){
            addTaskBtn.classList.add("not-working");
            setTimeout(()=>{
            addTaskBtn.classList.remove("not-working");
            }, 100)
        }
    }

}
taskContainer.addEventListener("click", (event)=>{
    const target = event.target;
    if (target.matches("i")){
        if (target.classList.contains("done")){
                makeItDone(target);
        }
        else if(target.classList.contains("remove")){
            makeItRemoved(target)
        }
        makeItOrdered();
    }
})


addTaskBtn.addEventListener("click", saveTask)
inputTask.addEventListener("keydown", (event)=>{
    if (event.key==="Enter") {
        saveTask()
    }    
})

window.addEventListener("keydown", ()=>{
    inputTask.focus()
})