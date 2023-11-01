const express = require('express');
const sample = express();
const port = 3000;
sample.listen(port, (error) =>{
    if(!error){
        console.log("server is running on port "+port);
    }
    else{
        console.log("fail to load server.");
    }
});