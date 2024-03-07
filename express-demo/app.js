import express from 'express';
const app = express();
const port = process.env.port || 3000
const todos = [
    { id: 1, title: "Acheter le cafe", completed: false },
    { id: 2, title: "Faire un post", completed: true }];

app.use(express.json())

app.post('/todos', (req, res) => {
    todos.push(req.body)
    console.log(todos);
    res.status(201).send(todos);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/todos', (req, res) => {
    res.json(todos);
})
app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const filteredTodo = todos.filter(item => item.id === id)
    if(filteredTodo.length){
        res.status(200).json(filteredTodo)
    } else{
        res.status(404).send("Ressource introuvable")
    }
    
})
app.post('/todos/:id', (req, res) => {
    // const id = parseInt(req.params.id)
    // console.log(id);
    // const title = req.body.title
    // const completed = req.body.completed
    // todos.forEach(element => {
    //     console.log(element.id, req.body.title);
    //     if (element.id === id) {
    //         if (req.body.title) {
    //             element.title = title
    //         }
    //         if (completed !== null && completed !== undefined) {
    //             element.completed = completed
    //         }
    //     }
    // });
    // res.status(201).send(todos);
    //parseInt est tres important
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
        const todo = todos[todoIndex]
        const updatedTodo = { ...todo, ...req.body }
        todos[todoIndex] = updatedTodo;
        res.json(todos)
    } else {
        res.status(404).send({ message: 'Todo not found' })
    }
})

app.post('/todos/remove/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(item => item.id === id);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        res.json(todos);
    } else {
        res.status(404).send({ message: 'Todo not found' })
    }
})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
})
