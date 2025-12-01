// SETUP

const baseURL = "https://api.vschool.io/Brandon/todo"
const todoForm = document.getElementById("todo-form")
const todoContainer = document.getElementById("todo-container")

// READ (GET) + RENDER 

function getTodos() {
    axios.get(baseURL)
    .then(res => {
        const todos = res.data
        renderTodos(todos)
    })
    .catch(err => console.log(err))
}
/* axios.get(baseURL) → ask API: “give me all Brandon’s todos”.

res.data → array of todo objects.

renderTodos(todos) → separate function only responsible for drawing them.

renderTodos:

clears the container (innerHTML = "")

loops (forEach(todo => { ... }))

creates DOM elements for each todo (title, desc, img, checkbox, delete button)

wires up checkbox → PUT

wires up delete button → DELETE

appends each todoDiv to the page */

todoForm.addEventListener("submit", e => { //why is sumbit "" and why e
    e.preventDefault()

    const newTodo = {
        title: todoForm.title.valueOf,
        description: todoForm.description.value,
        imgURL: todoForm.imgURL.value,
        completed: false
    }

    axios.post(baseURL, newTodo)
    .then(() => {
        todoForm.reset()
        getTodos()
    })
    .catch(err => console.log(err))
})
/* Form submit → stop default page reload.

Build newTodo from the form inputs.

Send it to the API via axios.post.

On success:

clear the form

call getTodos() again so the new one shows up. */

checkbox.addEventListener("change", () => {
    axios.put(`${baseURL}/${todo._id}`, {completed: checkbox.checked }) // i need a refresher on `${}`
    .then(() => getTodos())
    .catch(err => console.log(err))
})
//  When user toggles checkbox, we send a PUT with the new completed value.

// todo._id is the unique ID from the API.

// After update, we refresh the list.

deleteBtn.addEventListener("click", () => {
    axios.delete(`${baseURL}/${todo._id}`)
    .then(() => getTodos())
    .catch(err => console.log(err))
})
// When user clicks delete, send DELETE request for that ID.

// Refresh list after.

getTodos()
// When page first loads, grab todos and show them.