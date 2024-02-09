const express = require('express');
const cors = require('cors');
const multer = require('multer');


const upload = multer({dest: 'uploads/'});
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req,res) =>{
    res.send('hello world')
})



app.post('/api', upload.single('audio'), (req, res) =>{
    const audioFile = req.file;
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.body.userId;
  
  
   
  
    res.status(200).send('Audio uploaded successfully'); 
})

app.listen(3002, ()=>{
    console.log('server is running on pot http://localhost:3002')
})