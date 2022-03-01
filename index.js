const express = require("express");
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.json());

// get all items
app.get("/", (req,res)=>{
    res.send("hello world");
    });

app.get("/todolist", async(req,res)=>{
    try{
        const allTodos = await pool.query(
            "SELECT * FROM todolist");


        res.json(allTodos.rows);

    } catch (err) {
        console.log(err.messasge);
    }
});

// create an item

app.post("/todolist", async (req,res)=>{
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            `INSERT INTO bekki (description) VALUES ($1) RETURNING *` ,[description]);

        res.json(newTodo.rows[0]);

    } catch (err) {
        console.log(err.messasge);
        res.status(500).send('server error ...');
    }
});

app.listen(port,() =>{
    console.log(`server is listening on port ${port}`)
});