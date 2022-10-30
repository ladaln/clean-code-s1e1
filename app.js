//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

let taskInput = document.getElementById("item-wrap__input-js");//add a new task
let addButton = document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder = document.getElementById("todo__list-js");//ul of #todo__list-js
let completedTasksHolder = document.getElementById("completed__list-js");//completed__list-js

//New task list item
let createNewTaskElement = function(taskString) {

  let listItem = document.createElement("li");
  //input (checkbox)
  let checkBox = document.createElement("input");//checkbox
  //label
  let label = document.createElement("label");//label
  //label (wrapper)
  let labelWrap = document.createElement("label");//wrapper
  //input (text)
  let editInput = document.createElement("input");//text
  //button.edit
  let editButton = document.createElement("button");//edit button
  //button.delete
  let deleteButton = document.createElement("button");//delete button
  let deleteButtonImg = document.createElement("img");//delete button image

  listItem.className = "list__item";

  label.innerText = taskString;
  label.className = "list__label label-content";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "list__input list__input_checked input-checkbox";

  labelWrap.className = "wrap-label";

  editInput.type = "text";
  editInput.className = "list__input wrap-label__input wrap-label__input_focused";
  labelWrap.appendChild(editInput);

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not
  editButton.className = "list__btn btn list__btn_edit";

  deleteButton.className = "list__btn btn list__btn_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "img__delete";
  deleteButton.appendChild(deleteButtonImg);

  //and appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(labelWrap);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}


let addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #input-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
//Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
 taskInput.value = "";
}; 


//Edit an existing task.
let editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".list__btn_edit");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent
  listItem.classList.toggle("edit-mode");
};

//Delete task.
let deleteTask = function() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed

let taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed__list-js.
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked.
  //Append the task list item to the #todo__list-js.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

let ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector("button.list__btn_edit");
  let deleteButton = taskListItem.querySelector("button.list__btn_delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




//Issues with usability don't get seen until they are in front of a human tester.

//Prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
