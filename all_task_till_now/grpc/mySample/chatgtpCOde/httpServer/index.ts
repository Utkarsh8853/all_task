// http server
import express, { response } from 'express';
import client from './client';
const app = express();
const PORT = 3000;

app.use(express.json());



app.post('/api', (req, res) => {
    const message = "call";
    client.FirstMethod({ message: message }, (err: any, recipe: { id: any; }) => {
        if(err) return;
    });


    client.FirstMethod(message,(err: any, response: any) => {
        
        if(err){
            console.log("gfdsfghjgfdsadfbnfdsfgbnerfghnerghjmhgtrefgbnefgbngtrghnm");
        }
        else{
            console.log("////",response);
        }
    })
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});
