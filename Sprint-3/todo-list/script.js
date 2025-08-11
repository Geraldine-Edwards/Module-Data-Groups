function populateTodoList(todos) {
  // Write your code to create todo list elements with completed and delete buttons here, all todos should display inside the "todo-list" element.
  let list = document.getElementById("todo-list");
  // clear the list before populating it to ensure that when adding todos the list does not duplicate because it is cleared initially
  list.textContent = "";
  // for each todos object, create a list item and append it (and its index position) to the list
  todos.forEach((todo, index) => {
    // create a list element for each todo
    let todoItem = document.createElement("li");
    // update the text content in the list with the todo input
    todoItem.textContent = todo.task;
    // if the todo is completed, add a line-through style to the text
    if (todo.completed) {
      todoItem.style.textDecoration = "line-through";
    }
    // append the todo item to the list
    list.appendChild(todoItem);

    // Create completed button
    let completedButton = document.createElement("button");
    // change the button label based on the todo's completed status
    if (todo.completed) {
      completedButton.textContent = "Undo";
    } else {
      completedButton.textContent = "Complete";
    }

    // call the helper function to set up the completed button
    setupCompletedButton(completedButton, index);
    // append the completed button to the todo item
    todoItem.appendChild(completedButton);

    // create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    todoItem.appendChild(deleteButton);
  });
}

// These are the same todos that currently display in the HTML
// You will want to remove the ones in the current HTML after you have created them using JavaScript
let todos = [
  { task: "Wash the dishes", completed: false },
  { task: "Do the shopping", completed: false },
];

populateTodoList(todos);

// This function will take the value of the input field and add it as a new todo to the bottom of the todo list. These new todos will need the completed and delete buttons adding like normal.
function addNewTodo(event) {
  // The code below prevents the page from refreshing when we click the 'Add Todo' button.
  event.preventDefault();
  // Write your code here... and remember to reset the input field to be blank after creating a todo!
  // get the value of the input in the todo input field
  let todoInput = document.getElementById("todo");
  // remove the spaces at the start and end of the input
  let newTodo = todoInput.value.trim();
  // if the input is empty, do not add a new todo and just return the function (to prevent adding empty todos)
  if (!newTodo) {
    return;
  }
  // create a new todo object and add it to the todos array
  todos.push({ task: newTodo, completed: false });
  // repopulate the todo list with the updated todos array
  populateTodoList(todos);
  // reset the input field to be blank
  todoInput.value = "";
}
// when the user submits the input form calling the function creates a new todo
document.addEventListener("submit", addNewTodo);

function setupCompletedButton(completedButton, index) {
  completedButton.addEventListener("click", () => {
    // toggle the completed status - flip it to the opposite
    todos[index].completed = !todos[index].completed;
    populateTodoList(todos);
  });
}
function deleteTodo() {}

// Advanced challenge: Write a function that checks the todos in the todo list and deletes the completed ones (we can check which ones are completed by seeing if they have the line-through styling applied or not).
function deleteAllCompletedTodos() {
  // Write your code here...
}
