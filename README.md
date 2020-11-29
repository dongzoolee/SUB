# SUB
Using Seoul Metro API, this let you know when the subway arrives.

https://leed.at/sub

# Before We Start)
Your web-site will probably be SSL protected site.  
But Seoul Subway API is provided with http site.  
We cannot get data from 'http' from 'https'(viceversa), because of CORS policy.  
Let's solve the problem with node.JS  

# 1. Client_side.html
```
<body>
    <h1>역명을 입력하세요</h1>
    <iframe name="hih" id="hih" style="display: none;"></iframe>
    <form target="hih">
        <input type="text" id="stat" list="search" placeholder="경의중앙선 서강대역">
        <datalist id="search">
        </datalist>
        <input type="submit" id="submit" value="검색">
    </form>
    <div id="after"></div>
    <script src="./sub.js"></script>
</body>
```

# 2. sub.js
### 1) Get (station name - line) data from sub_info.xml AND merge with station line code
```
window.onload = function () {
    init();
}
function init() {
    $.ajax({
        type: "get",
        dataType: "xml",
        url: "./sub_info.xml",
        success: function (xml) {
            var str = $(xml).find('text');
            $(str).each(function (idx) {
                var ret = lines[$(this).find('sub_id').text()] + ' ' + $(this).find('stat_name').text() + '역';
                $('#search').append('<option value="' + ret + '">');
            });
        }
    });
}
```
### 2) Send station name by 'GET' to nodejs server.
```
seperate(received, function (line, stat) {
        if ($.trim(line + stat) == "") { alert("값입력해"); return false; }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'NODEJS_SERVER_ADDRESS/sub?stat=' + encodeURIComponent(stat));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log('보냈습니다')
        xhr.onload = function () {
            var xml = xhr.response;
            console.log(xml)
            /// . . . 데이터 가공중 . . .///
        }
        xhr.send();
    })
```

# 3. server_side_nodejs.js
```
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
```
Send response of GET to client with 

  res.end($.html());
