// Define Ui Vars

const form =document.querySelector('#task-form');
const taskList= document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task');

// Load all event listenters

loadEventListners();

// load all event listeners 

function loadEventListners(){
// dom load evnet 
document.addEventListener('DOMContentLoaded',getTasks);
// add taks event 
form.addEventListener('submit',addTask);
// remove taks event 
taskList.addEventListener('click',removeTask);
// clear tasks
clearBtn.addEventListener('click',clearTasks);
// filter tasks events
filter.addEventListener('keyup',filterTasks);

}

function getTasks(){

let tasks;
if(localStorage.getItem('tasks')=== null){

tasks=[];
}
else{

tasks=JSON.parse(localStorage.getItem('tasks'));

}
tasks.forEach(function(task){

//create li element
const li =document.createElement('li');

// add class
li.className="collection-item";

//create text node and append to li
li.appendChild(document.createTextNode(task));

// create link node

const link =document.createElement('a');

//add class
link.className="delete-item secondary-content";

//add icons html
link.innerHTML="<i class='fa fa-remove'></i>";
// add icon


// append the lin to li

li.appendChild(link);

// append li to ul

taskList.appendChild(li);

});

}

// add task
function addTask(e){

if(taskInput.value===''){
alert('add task');

}

//create li element
const li =document.createElement('li');

// add class
li.className="collection-item";

//create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));

// create link node

const link =document.createElement('a');

//add class
link.className="delete-item secondary-content";

//add icons html
link.innerHTML="<i class='fa fa-remove'></i>";
// add icon


// append the lin to li

li.appendChild(link);

// append li to ul

taskList.appendChild(li);

// add to LS

storeTaskInLocalStorage(taskInput.value);


// clear input

taskInput.value="";

e.preventDefault();

}

function storeTaskInLocalStorage(task){

let tasks;
if(localStorage.getItem('tasks')=== null){

tasks=[];
}
else{

tasks=JSON.parse(localStorage.getItem('tasks'));

}
tasks.push(task);
localStorage.setItem('tasks',JSON.stringify(tasks));


}

// remove task

function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item')){
if(confirm('are you sure ?')){

e.target.parentElement.parentElement.remove();

removeTaskFromLocalStorage(e.target.parentElement.parentElement);


}

}

}

// Remove fom LS

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
    
    tasks=[];
    }
    else{
    
    tasks=JSON.parse(localStorage.getItem('tasks'));
    
    }
    tasks.forEach(function(task,index){

        if(taskItem.textContent=== task){
            tasks.splice(index,1);
        }


    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}



// clear tasks
function clearTasks(e){

// taskList.innerHTML="";

if(confirm('are you sure ?')){
while(taskList.firstChild){

taskList.removeChild(taskList.firstChild);
}
clearTasksFromLocalStorage();


}

}

function clearTasksFromLocalStorage(){

    localStorage.clear();
}

// filter tasks

function filterTasks(e){

const text = e.target.value.toLowerCase();
let itemcol = document.querySelectorAll('.collection-item');

itemcol.forEach(function(task){

const item =task.firstChild.textContent;

if(item.toLowerCase().indexOf(text) != -1){

task.style.display="block";

}
else{
task.style.display="none";

}


});

}

