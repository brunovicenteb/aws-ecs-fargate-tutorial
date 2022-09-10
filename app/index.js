const os = require("os");
const express = require('express')
const axios = require('axios');
const { response } = require('express');

const app = express();
const port = 3000;

const indexPage = `
    <h3>Hello from a Node.js Application ruiing on AWS ECS Fargate</h3>

    <p>What would you like to see?</p>

    <ul>
        <li>Random dogs? <a href="/dogs">Click here</a></li>
    </ul>`;

app.get('/', (req, res)=> res.send(indexPage));

app.get('/healthcheck', (req, res)=> {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }

});

app.get('/dogs', async(req, res)=> {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        console.log(JSON.stringify(response.data));
        const { message: dogImage } = response.data;
        res.send(
            `<img src="${dogImage}" alt="random dog" style="max-width: 500px" />`
        );
    } catch (error) {
        console.log.error(JSON.stringify(response.data));
        res.status(500);
        res.send(error.message);
    }

});

app.get('/host', async(req, res)=> {
    try {
        var hostname = os.hostname();
        res.send(
            `<h3>This is running from "${hostname}"</h3>`
        );
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

});

app.listen(port, ()=> {
    console.log(`App running on port ${port}`);
});