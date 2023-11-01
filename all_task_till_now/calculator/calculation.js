const express = require('express');
const app = express();
let bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.get('/', (req,res) =>{
    res.send("Calculator Started ");
}).listen(80, () => console.log('App is running on port '));
app.post('/add', (req,res) => {
    const data =req.body;
    let ans = data.n1+data.n2;
    res.json({ans});
})
app.post('/sub', (req,res) => {
    const {n1 , n2}=req.body;
    let ans = n1-n2;
    res.json({ans});
})
app.post('/mul', (req,res) => {
    const {n1 , n2}=req.body;
    let ans = n1*n2;
    res.json({ans});
})
app.post('/div', (req,res) => {
    const {n1 , n2}=req.body;
    let ans = n1/n2;
    res.json({ans});
})
app.post('/rem', (req,res) => {
    const {n1 , n2}=req.body;
    let ans = n1%n2;
    res.json({ans});
})
