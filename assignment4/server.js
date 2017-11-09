var http = require('http'), fs = require('fs');

var indexFile =  fs.readFileSync('./public/index.html','utf8');
var indexJs =  fs.readFileSync('./public/index.js','utf8');
var style =  fs.readFileSync('./public/style.css','utf8');
var img = fs.readFileSync('./public/benny.jpg');
var html404 = fs.readFileSync('./public/404.html','utf8');
var favIcon = fs.readFileSync('./public/benny_icon.ico','utf8')

var server = http.createServer(function (req, res) {
      console.log("== Client Requested " + req.url);      
      switch(req.url){        
        case "/":
            res.write(indexFile);
	    break;
        case "/style.css":
            res.write(style); 
            break;
        case "/index.js":
	    res.write(indexJs); 
            break;  
        case "/benny.jpg":
	   res.write(img);
            break;
        case "/index.html":
	    res.write(indexFile);
            break;
	case "/favicon.ico":
	    res.write(favIcon);
        default:
	    res.write(html404);            
	    break;
  }
  
  res.end();
});

server.listen(3000, function () {
  console.log("== Server listening on port 3000");
});
