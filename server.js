// server.js
const express = require('express');
const pool = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении книг');
    }
});


// >>> API для приёма формы обратной связи <<<
app.post('/api/feedback', async (req, res) => {
    const { name, email, message } = req.body;

    if (!message) return res.status(400).send('Сообщение не должно быть пустым');

    try {
        await pool.query(
            'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        res.send('Спасибо за обратную связь!');
    } catch (err) {
        console.error('Ошибка при сохранении жалобы:', err);
        res.status(500).send('Ошибка сервера');
    }
});


// >>> Слушаем порт <<<
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
