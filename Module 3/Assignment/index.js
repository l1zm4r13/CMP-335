const express = require('express');
const app = express();

app.use(express.json());

const podcasts = [
    {id: 1, title: 'The Daily', host: 'Michael Barbaro', category: 'News'},
    {id: 2, title: 'The Joe Rogan Experience', host: 'Joe Rogan', category: 'Entertainment'},
    {id: 3, title: 'Huberman Lab', host: 'Andrew Huberman', category: 'Science'},
    {id: 4, title: 'On Purpose', host: 'Jay Shetty', category: 'Self-Improvement'},
    {id: 5, title: 'Crime Junkie', host: 'Ashley Flowers', category: 'True Crime'}
];

app.get('/', (req, res) => res.send('Welcome to my Podcast Collection API!'));

app.get('/api/podcasts', (req, res) => {res.send(podcasts);});

app.get('/api/podcasts/:id', (req, res) => {const podcast = podcasts.find(p => p.id === parseInt(req.params.id));

    if (!podcast) {return res.status(404).send('Podcast not found');}

    res.send(podcast);
});

app.post('/api/podcasts', (req, res) => {
    if (!req.body.title || !req.body.host || !req.body.category) {
        return res.status(400).send('Title, host, and category are required');
    }

    const podcast = {
        id: podcasts.length > 0
            ? Math.max(...podcasts.map(p => p.id)) + 1
            : 1,
        title: req.body.title,
        host: req.body.host,
        category: req.body.category
    };

    podcasts.push(podcast);
    res.send(podcast);
});

app.put('/api/podcasts/:id', (req, res) => {
    const podcast = podcasts.find(p => p.id === parseInt(req.params.id));

    if (!podcast) {
        return res.status(404).send('Podcast not found');
    }

    if (!req.body || !req.body.title || !req.body.host || !req.body.category) {
        return res.status(400).send('Title, host, and category are required');
    }

    podcast.title = req.body.title;
    podcast.host = req.body.host;
    podcast.category = req.body.category;

    res.send(podcast);
});

app.delete('/api/podcasts/:id', (req, res) => {
    const podcast = podcasts.find(p => p.id === parseInt(req.params.id));

    if (!podcast) {
        return res.status(404).send('Podcast not found');
    }

    const index = podcasts.indexOf(podcast);
    podcasts.splice(index, 1);

    res.send(podcast);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}...`);});