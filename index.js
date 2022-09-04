import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi tim');
});

app.post('/login', (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
  });
  // res.send('hi tim');
})

app.listen(4444, (err) => {
  if (err) {
    return console.log('error =>', err);
  }

  console.log('Server OK');
})
