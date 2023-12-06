const express = require('express');
const app = express();
app.use(express.json());

const clouds = [];

// Utwórz nową chmurę
app.post('/clouds', (req, res) => {
    const cloud = { id: clouds.length + 1, name: req.body.name };
    clouds.push(cloud);
    res.status(201).send(cloud);
});

// Odczytaj listę chmur
app.get('/clouds', (req, res) => {
    res.send(clouds);
});

// Usuń chmurę
app.delete('/clouds/:id', (req, res) => {
    const cloud = clouds.find(c => c.id === parseInt(req.params.id));
    if (!cloud) return res.status(404).send('Cloud not found.');

    const index = clouds.indexOf(cloud);
    clouds.splice(index, 1);
    res.send(cloud);
});

// Uruchom serwer
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
