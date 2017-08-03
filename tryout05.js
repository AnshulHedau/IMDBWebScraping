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
   var o = {} // empty Object
var key = 'MovieIndian';
o[key] = []; // empty Array, which you can push() values into
  console.log("--------------Books Information --------");
  for (var i = 0; i < 5;++i) {
    links =  (jsonData[i].links);
      var temp = links.split("?");
      ratings = temp[0] + "ratings";
      url = 'http://www.imdb.com'+ratings;
      //console.log(url);
               var req = request(url, function(error, response, html){
                        if(!error){
                            var $ = cheerio.load(html);
                            var title;
                            $('#tn15main').filter(function(){
                                var data = $(this);
                                var name  = data.children().eq(1).children().children().eq(1).text();
                                var extrated =  data.children().eq(2).children().eq(5).children().children();
                                        var json ={};
                                        json.name = name;
                                        json.rating10 = extrated.eq(1).children().first().text();
                                        json.rating9 = extrated.eq(2).children().first().text();
                                        json.rating8 = extrated.eq(3).children().first().text();
                                        json.rating7 = extrated.eq(4).children().first().text();
                                        json.rating6 = extrated.eq(5).children().first().text();
                                        json.rating5 = extrated.eq(6).children().first().text();
                                        json.rating4 = extrated.eq(7).children().first().text();
                                        json.rating3 = extrated.eq(8).children().first().text();
                                        json.rating2 = extrated.eq(9).children().first().text();
                                        json.rating1 = extrated.eq(10).children().first().text();
                                        
                                        
                                        
                                        o[key].push(json);
                                        //console.log(i +" \t"+extrated);
                                        fs.writeFile('output1.json', JSON.stringify(o, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
                                        
                            })
                        }
//                        console.log(error);
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