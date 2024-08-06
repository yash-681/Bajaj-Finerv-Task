const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the REST API!');
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Missing or invalid 'data' field" });
    }

    const full_name = "John Doe";
    const dob = "17/09/1999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    const user_id = `${full_name.replace(/ /g, '_').toLowerCase()}_${dob.replace(/\//g, '')}`;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});