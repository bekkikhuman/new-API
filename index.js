const express = require("express");
const app = express();
const port = 2000;
const pool = require("./db");

app.use(express.json());

// get all items
app.get("/", (req,res)=>{
    res.send("hello world");
    });

app.get("/todolist", async(req,res)=>{
    try{
        const alltodo = await pool.query(
            "SELECT * FROM bekki");

            res.json(alltodo.rows);
    } catch (err) {
        console.log(err.messasge);
    }
});

app.get("/todolist/:id", async(req,res)=>{
    const { id } = req.params;
    try {
        const todo = await pool.query('SELECT * FROM bekki WHERE bekki_id = $1', [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// create an item

app.post("/todolist", async (req,res)=>{
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            `INSERT INTO bekki (description) VALUES ($1) RETURNING *` ,[description]);
        console.log('added succesfully.')
        res.json(newTodo.rows[0]);

    } catch (err) {
        console.log(err.messasge);
        res.status(500).send('server error ...');
    }
});

//update an item

app.put("/todolist/:id", async(req,res)=>{
    try{
        const { id } = req.params;
        const {description} = req.body;

        const updatetodo = await pool.query(
            "UPDATE bekki SET description =$1 WHERE bekki_id = $2", [description , id]);

        res.json("update successfully");
    } catch (err) {
        console.error(err.message);
    }
});

//delete an item

app.delete("/todolist/:id", async(req,res)=>{
    try{
        const { id } = req.params;
        const deletetodo = await pool.query(
            "DELETE FROM bekki WHERE bekki_id = $1", [id]);

        res.json("Delete successfully.");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port,() =>{
    console.log(`server is listening on port ${port}`)
});
