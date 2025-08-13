function populateTodoList(todos) {
  // Write your code to create todo list elements with completed and delete buttons here, all todos should display inside the "todo-list" element.
  let list = document.getElementById("todo-list");
  // clear the list before populating it to ensure that when adding todos the list does not duplicate because it is cleared initially
  list.textContent = "";
  // for each todos object, create a list item and append it (and its index position) to the list
  todos.forEach((todo, index) => {
    // create a list element for each todo
    let todoItem = document.createElement("li");

    // create a span for the todo text
    let todoText = document.createElement("span");
    todoText.textContent = todo.task;

    // if the todo is completed, add a line-through style to the text
    if (todo.completed) {
      todoText.style.textDecoration = "line-through";
    }
    // append the text span to the todoItem
    todoItem.appendChild(todoText);

    // add the deadline details if it exists
    if (todo.deadline) {
      let deadlineText = document.createElement("span");
      // add the text
      deadlineText.textContent = ` (Due By: ${todo.deadline})`;
      // append to the todo item itself
      todoItem.appendChild(deadlineText);
    }
    // call the helper function to create the completed button
    let completedButton = createCompletedButton(todo, index);
    // append the completed button to the todo item
    todoItem.appendChild(completedButton);

    // call the helper function to create the delete button
    let deleteButton = createDeleteButton(todo, index);
    // append the button to the todo item
    todoItem.appendChild(deleteButton);

    // append the todo item to the list
    list.appendChild(todoItem);
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
  // get the todo-deadline input
  let todoDeadline = document.getElementById("todo-deadline");
  // remove the spaces at the start and end of the input
  let newTodo = todoInput.value.trim();
  // get the value of the deadline input or null if no date selected
  let deadline = todoDeadline.value || null;
  // if the input is empty, do not add a new todo and just return the function (to prevent adding empty todos)
  if (!newTodo) {
    return;
  }
  // create a new todo object and add it to the todos array
  todos.push({ task: newTodo, completed: false, deadline: deadline });
  // repopulate the todo list with the updated todos array
  populateTodoList(todos);
  // reset the input field to be blank
  todoInput.value = "";
  // reset the deadline input to be blank
  todoDeadline.value = "";
}
// when the user submits the input form calling the function creates a new todo
document.addEventListener("submit", addNewTodo);

function createCompletedButton(todo, index) {
  // create the complete icon element
  let completedButton = document.createElement("button");

  // add an id to the button
  completedButton.id = "complete-button";
  // toggle the icon depending on complete status
  if (todo.completed) {
    completedButton.innerHTML = '<i class="fa fa-undo"></i> Undo';
  } else {
    completedButton.innerHTML = '<i class="fa fa-check"></i> Complete';
  }
  // add the functionality to the button
  completedButton.addEventListener("click", () => {
    // toggle the completed status - flip it to the opposite
    todos[index].completed = !todos[index].completed;
    populateTodoList(todos);
  });
  // return the completed button so it can be added to the todo item
  return completedButton;
}

function createDeleteButton(todo, index) {
  // create the delete button
  let deleteButton = document.createElement("button"); // add ID for delete button
  deleteButton.id = "delete-button";
  // set the text of the button
  deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
  // add the functionality to the button
  deleteButton.addEventListener("click", (event) => {
    // confirm if the user wants to delete the todo
    if (confirm("Are you sure you want to delete this todo?")) {
      // remove the todo at this specific index
      todos.splice(index, 1);
      // refresh the display
      populateTodoList(todos);
    }
  });
  // return the delete button so it can be added to the todo item
  return deleteButton;
}

// Advanced challenge: Write a function that checks the todos in the todo list and deletes the completed ones (we can check which ones are completed by seeing if they have the line-through styling applied or not).

function deleteAllCompletedTodos() {
  // count the number of completed todos
  const completedCount = todos.filter((todo) => todo.completed).length;
  // check if there are any completed todos
  if (completedCount === 0) {
    // return an alert if there are no completed todos
    alert("No completed todos to delete.");
    return;
  }
  // if there are completed todos, confirm with the user if they want to delete the specific number of completed todos
  if (
    confirm(
      `Are you sure you want to delete these ${completedCount} completed todos?`
    )
  ) {
    // if the todos are not completed, filter them out of the todos array and update the original array with them
    todos = todos.filter((todo) => !todo.completed);
    // repopulate the todo list with the updated todos array
    populateTodoList(todos);
  }
}
// add an event listener to the remove all completed button
document
  .getElementById("remove-all-completed")
  .addEventListener("click", deleteAllCompletedTodos);
