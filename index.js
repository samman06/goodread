const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, (req, res) => {
    console.log("server running on port: " + PORT);
});

