const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;

const app = express();

app.use(express.json());
app.use(cors());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mytodos",
  password: "ourpassword",
  port: 5432,
});

//routes below
//add todos

app.post("/add-todos", async (req, res) => {
  console.log("Added todos");
  console.log(req.body);
  const todo = req.body.todo;
  const todoDate = req.body.todoDate;
  const sqlQuery = "INSERT INTO todos_table(todo, todo_date) VALUES($1,$2)";
  await db.query(sqlQuery, [todo, todoDate]);
  res.send({ message: "todo added successfully" });
});
//get todos
app.get("/get-todos", async (req, res) => {
  const sqlQuery = "SELECT * FROM todos_table ORDER BY todo_id";
  const todosFroMDatabase = await db.query(sqlQuery);
  res.send({ message: "todos fetched", todos: todosFroMDatabase.rows });
});

//edit todos
app.put("/edit-todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const todo = req.body.todo;
  const todoDate = req.body.todoDate;

  const sqlQuery =
    "UPDATE todos_table SET todo = $1, todo_date = $2 WHERE todo_id = $3";
  await db.query(sqlQuery, [todo, todoDate, todoId]);
  res.send({ message: "todo edited successfully" });
});
//delete todo
app.delete("/delete-todo/:todoId", async (req, res) => {
  console.log("delete request params");
  console.log(req.params);
  const todoId = req.params.todoId;
  const sqlQuery = "DELETE FROM todos_table WHERE todo_id = $1";
  await db.query(sqlQuery, [todoId]);
  res.send({ message: "todo deleted successfully" });
});

//mark to complete
app.put("/mark-todo/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const isTodoMarked = req.body.isTodoMarked;

  const sqlQuery =
    "UPDATE todos_table SET is_marked_complete = $1 WHERE todo_id = $2 RETURNING *";
  const todoStatus = await db.query(sqlQuery, [isTodoMarked, todoId]);
  let message;
  if (todoStatus.rows[0].is_marked_complete === true) {
    message = "Todo marked complete!";
  } else {
    message = "Todo unmarked!";
  }
  res.send({ message: message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server running on port " + port + "...");
});
