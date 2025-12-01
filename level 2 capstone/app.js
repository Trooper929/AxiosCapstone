const baseURL = "https://api.vschool.io/Brandon/todo"
const todoForm = document.getElementById("todo-form")
const todoContainer = document.getElementById("todo-container")


function getTodos() {
  axios.get(baseURL)
    .then(res => {
      const todos = res.data
      renderTodos(todos)
    })
    .catch(err => console.log(err))
}

function renderTodos(todos) {
  todoContainer.innerHTML = ""

  todos.forEach(todo => {
    const todoDiv = document.createElement("div")

    const title = document.createElement("h2")
    title.textContent = todo.title
    if (todo.completed) {
      title.style.textDecoration = "line-through"
    }

    const desc = document.createElement("p")
    desc.textContent = todo.description || ""

    if (todo.imgUrl) {
      const img = document.createElement("img")
      img.src = todo.imgUrl
      img.alt = todo.title
      img.style.maxWidth = "200px"
      todoDiv.appendChild(img)
    }

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed
    checkbox.addEventListener("change", () => {
      axios.put(`${baseURL}/${todo._id}`, { completed: checkbox.checked })
        .then(() => getTodos())
        .catch(err => console.log(err))
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener("click", () => {
      axios.delete(`${baseURL}/${todo._id}`)
        .then(() => getTodos())
        .catch(err => console.log(err))
    })

    todoDiv.appendChild(title)
    todoDiv.appendChild(desc)
    todoDiv.appendChild(checkbox)
    todoDiv.appendChild(deleteBtn)

    todoContainer.appendChild(todoDiv)
  })
}

todoForm.addEventListener("submit", e => {
  e.preventDefault()
  console.log("FORM SUBMITTED BUT JS IS WORKING")

  const newTodo = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    imgUrl: todoForm.imgUrl.value,
    completed: false
  }

  axios.post(baseURL, newTodo)
    .then(() => {
      todoForm.reset()
      getTodos()
    })
    .catch(err => console.log(err))
})

getTodos()
