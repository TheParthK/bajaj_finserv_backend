const express = require('express');
const app = express();
const cors = require('cors');
const cron = require('node-cron');

app.use(cors()); 
// app.use(cron()); 
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input, 'data' should be an array." });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && isNaN(parseFloat(item)));

    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().slice(-1)[0]]
        : [];

    res.json({
        is_success: true,
        user_id: "parthkalia09022004",  
        email: "parth.kalia2021@vitbhopal.ac.in", 
        roll_number: "21BAI10109",    
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// 
const backendUrl = "https://bajaj-finserv-backend-wn08.onrender.com/bfhl";
cron.schedule("*/180 * * * * * ", async function () {
  console.log("Restarting server");

  await https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error('failed to restart with status code: ${res.statusCode}');
      }
    })
    .on("error", (err) => {
      console.log("hi");
      console.error("Error ", err.message);
    });
});
// 
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
