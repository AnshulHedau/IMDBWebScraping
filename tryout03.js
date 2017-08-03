var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/chart/top/';
//url = 'http://www.imdb.com/india/top-rated-indian-movies/';
var o = {} // empty Object
var key = 'MovieIndian';
o[key] = []; // empty Array, which you can push() values into


request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating,links,title01,link1;
    

    $('.lister-list').filter(function(){
        var data = $(this);
        for(var i=0;i<250;i++)
            {
                title = data.children().children().eq(i*5+1).children().eq(0).text();       
                rating = data.children().children().eq(i*5+1).children().eq(1).text();
                links = data.children().children().eq(i*5+1).children().attr('href'); 
                links1 = data.children().children().eq(i*5).children().children().attr('src'); 
//                console.log(links1);
                    
                //rating = data.children().text(); 
                var json = { title : "", rating : "",links : "",title1 : "",link1 :""};
                json.rating = rating;
                json.title = title;
                json.links = links;
                json.link1 = links1;
//                fun(links);
//                json.title1 = title01;
                o[key].push(json);
//                console.log(title);
            }
        //json.release = release;
    })
        
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(o, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})
//var fun =function(links)
//{
//    url = 'http://www.imdb.com'+links;
//               var req = request(url, function(error, response, html){
//                        if(!error){
//                            var $ = cheerio.load(html);
//                            var title;
//                            $('.summary_text').filter(function(){
//                                var data = $(this);
//
//                                        title01 = data.text();
//                                        console.log(title01);
//                                        
//                            })
//                        }
//                    })
//                        
//      req.end();
//}
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;