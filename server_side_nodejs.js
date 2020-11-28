var express = require('express');
var app = express();
var cors=require('cors');
app.use(cors());
var client = require('cheerio-httpcli');
var https = require('https');
var fs=require('fs');
const { countReset } = require('console');
try {
    var options = {
        cert: fs.readFileSync('fullchain.pem'),
        key: fs.readFileSync('privkey.pem')
    };
    var server = https.createServer(options, app)
        .listen(3338, () => {
            console.log('server has started on port 3338')
        });
} catch (err) {

}

app.use('/sub', (req, res) => {
    var stat = req.query.stat;
    stat=encodeURIComponent(stat);
    var url = "http://swopenapi.seoul.go.kr/api/subway/YOUR_API_KEY/xml/realtimeStationArrival/0/1000/"+stat;
    console.log(url)
    client.fetch(url, {}, (err, $, result) => {
        console.log($.html());
        res.end($.html());
    })
})
