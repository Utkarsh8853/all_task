const express = require('express');
const app = express();
let bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.get('/', (req,res) =>{
    res.send("Calculator Started ");
}).listen(3000, () => console.log('App is running on port 3000'));
app.post('/cal', (req,res) => {
    const data =req.body;
    let ans;
    switch(data.operator){
        case '+':
            ans=data.n1+data.n2;
            break;
        case '-':
            ans=data.n1-data.n2;
            break;
        case '*':
            ans=data.n1*data.n2;
            break;
        case '/':
            ans=data.n1/data.n2;
            break;
        case '%':
            ans=data.n1/data.n2;
            break;
        case '**':
            ans=data.n1**data.n2;
            break;
            
    }
    res.json({ans});
})

