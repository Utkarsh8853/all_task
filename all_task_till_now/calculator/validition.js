const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//validation for user registration
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

let users = [];

//user registration
app.post('/register', (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate({ email, password });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = { email, password };
    let check = users.find(u => u.email === email);
    if (check) {
      res.status(401).send("Email is already used");
    } else {
      users.push(user);
      res.status(201).send("Account is created");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

//user login
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate({ email, password });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(406).send('Invalid email or password');
    }
    res.status(200).send("Logged in");
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

//user deletion
app.delete('/delete', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = {email, password};
    let check = users.find(u => u.email === email && u.password === password);
    if (!check) {
      return res.status(404).send('User not found');
    }
    users.pop(user);
    res.status(201).send("Account deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

//user password updation
app.put('/update', (req, res) => {
  try {
    let { email, password, updatedPassword } = req.body;
    const user = {email, password};
    let check = users.find(u => u.email === email && u.password === password);
    if (!check) {
      return res.status(404).send('User not found');
    }
    users.pop(user);
    password = updatedPassword;
    const newUser = {email,password };
    users.push(newUser);
    res.status(201).send("Account Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});


app.use((req, res) => {
  res.status(500).send('Something went wrong!');
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});