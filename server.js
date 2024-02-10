const express = require('express');
const path =require('path');
const mysql = require('mysql');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('*',(req,res) => {res.sendFile(path.join(__dirname, 'build' , 'index.html'))});

const PORT = process.env.PORT || 8001;
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'test' //اسم قاعدة البيانات لدي 
    

})
app.get('/',(req,res) =>{
    const sql = "SELECT * FROM info";
    db.query(sql, (err,result) =>{
        if (err) return res.json({Message:"Error inside server"});
        return res.json(result);
        
    })
})
app.post('/info', (req, res) => {
    const sql = "INSERT INTO info(`languge`, `gender`,`age`,`country`) VALUES(?, ?, ?, ?)";

    const values = [
        req.body.languge,
        req.body.gender,
        req.body.age,
        req.body.country
       
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING  ON  http://localhost:${PORT}}`)
})