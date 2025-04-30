const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express(); 
app.use(cors());
app.use(express.json());

const FILE = 'users.json';

app.post('/signup', (req, res) => {
  const newUser = req.body;

  fs.readFile(FILE, 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    const existingIndex = users.findIndex(user => user.contact === newUser.contact);

    if (existingIndex !== -1) {
      users[existingIndex] = newUser;
    } else {
      users.push(newUser);
    }

    fs.writeFile(FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.send(existingIndex !== -1 ? 'User updated' : 'New user saved');
    });
  });
});


app.get('/users', (req, res) => {
  fs.readFile(FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Could not read file');
    }
    const users = JSON.parse(data || '[]');
    res.json(users);
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
