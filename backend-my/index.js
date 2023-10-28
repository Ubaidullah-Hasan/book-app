import express from "express";
import mysql from "mysql";   
import cors from "cors";
const app = express();
const port = process.env.PORT || 8800;

// middleware
app.use(cors());
app.use(express.json());

// database connection
const databage = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "book_app"
});

// database connection check
databage.connect((err) => {
    if (err) throw err;
    console.log("MySQL Database Connected!");
});

// get method
app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    databage.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

// post method
app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    databage.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// delete method
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    const q = "DELETE FROM books WHERE id = ?";
    databage.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted");
    })
})

// update method
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE `books` SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    databage.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been successfully updated!");
    })
}) 



























// Normal Setup

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

