const express = require('express');
const path = require('path');
const app = express();

app.get('/documents/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'documents', filename);
    console.log()
  res.sendFile(filePath, (err) => {
      if (err) {
          console.log("File not found:", err);
          res.status(404).send("File not found");
      }
  });
});

module.exports = app;
