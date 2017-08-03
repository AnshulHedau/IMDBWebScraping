var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.get('/scrape', function(req, res){
fs.readFile('output.json', 'utf8', function (err, data) {
  if (err) throw err;
  var jsonData01 = JSON.parse(data);
var jsonData  = jsonData01.MovieIndian;
   
  console.log("--------------Books Information --------");
  for (var i = 0; i < 1;++i) {
    links =  (jsonData[i].links);
    url = 'http://www.imdb.com'+links;
               var req = request(url, function(error, response, html){
                        if(!error){
                            var $ = cheerio.load(html);
                            var title;
                            $('.summary_text').filter(function(){
                                var data = $(this);

                                        title01 = data.text();
                                        console.log(title01);
                                        
                            })
                        }
                    })
                        
      req.end();
//    console.log("Book Name Id"+jsonData[i].book_name);
//    console.log("Book Cost Id"+jsonData[i].book_cost);
    }
});
})
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;