// Choosing All Element
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    clearButton.addEventListener("click",clearAllTodos);

}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        
    }
 
}
function clearAllTodos(e){ // clean todos from UI
    if(confirm("Are you Sure")){

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
   
   
    }




}    
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);//Value is cleaned from Array
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
//////
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("Please Enter Todo");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }

   
    e.preventDefault();
}
//////////
function addTodoToUI(newTodo) {
  
    // Creating List Item
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    // Creating Link
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.className = "list-group-item d-flex justify-content-between";
    // Adding TextNode
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // Adding List Item to TodoList
    todoList.appendChild(listItem);
    //Clear Input Area
    todoInput.value = "";
}
///////////
function getTodosFromStorage(){ // Taking Todos from Storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
/////////
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
///////
function showAlert(message){
    const alert = document.createElement("div");
    alert.className = 'alert alert-danger';
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
        
    }, 1000);
}