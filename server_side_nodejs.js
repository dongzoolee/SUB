const express = require('express');
const app = express();
const client = require('cheerio-httpcli');

const server = app.listen(3338, () => {
        console.log('server has started on port 3338')
    });

app.use('/sub', (req, res) => {
    var stat = req.query.stat;
    stat = encodeURIComponent(stat);
    var url = "http://swopenapi.seoul.go.kr/api/subway/46444b44426e616e383375784f696c/xml/realtimeStationArrival/0/1000/" + stat;
    // console.log(url)
    client.fetch(url, {}, (err, $, result) => {
        // console.log($.html());
        res.header("Access-Control-Allow-Origin", "https://leed.at");
        res.end($.html());
    })
})
