// server.js
const express = require('express');
const pool = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // где лежит твой HTML

// API для получения книг
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при получении книг');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});