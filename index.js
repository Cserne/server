const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
const fs = require('fs');

    
let rawData = fs.readFileSync('data/students.json', 'utf8');
let students = JSON.parse(rawData);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

//Show all students:
app.get('/api/students', (req, res) => {
    res.json(students);
});

//Show a student by id:
app.get('/api/students/:id', (req, res) => {
  const found = students.find(student => student.id === parseInt(req.params.id));
  res.json(found); //Így egy sima objektumként adja vissza.

/*   if (found) {
    res.json(students.filter(student => student.id === parseInt(req.params.id)))
  } else {
    res.sendStatus(400)
  }
 */ 

  //Ha a 26.sort kihagyom, és a 28-32. sorokat nem kommentelem ki, akkor egy tömbön belüli objektumként adja vissza.
})

//Get active students:
app.get('/api/status/active', (req, res) => {
  let activeStudents = students.filter(s => s.status === true);
  res.json(activeStudents);
});

//Get finished students:
app.get('/api/status/finished', (req, res) => {
  let finishedStudents = students.filter(s => s.status === false);
  res.json(finishedStudents);
});

//Post a new student:
app.post('/api/students', (req, res) => {
  const student = {
    id: students.length+1,
    name: req.body.name,
    status: true
}
  students.push(student);
  res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = router;