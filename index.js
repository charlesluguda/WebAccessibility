// server.js
const express = require('express');
const pa11y = require('pa11y');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

app.get('/audit', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await pa11y(url);
        const issues = response.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            context: issue.context
        }));
        res.json({ issues });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
