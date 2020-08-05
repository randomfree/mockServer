const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();

const port = 3001;

const mockData = require('./mockdata');

function start() {
    app.use((req, res) => {
        console.log(req.url);
        let mockd = mockData[req.url];
        if (mockd) {
            fs.readFile(mockd,'utf8',function(err,data){
                res.send(data);
            })
        }
        axios({
            method: req.method,
            headers: req.headers,
            url: req.url,
            data: req.body
        }).then(function (resp) {
            res.status(resp.status).send(resp.data).end();
            console.log(resp);
        });

    });
    app.use(express.static('../../../public'));
    app.listen(port, () => {
        console.log(`Example app listening on http://127.0.0.1:${port}`);
    })
}

module.exports = {
    start
}