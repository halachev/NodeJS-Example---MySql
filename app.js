HOST = '212.75.9.182'; 
PORT = process.env.VMC_APP_PORT || 1337;

var fu = require("./fu"),
	sys = require("util"),	
	url = require("url"),
	http = require('http'),			
	qs = require("querystring"),
	mysql = require('mysql');
	
 
fu.listen(Number(process.env.PORT || PORT), HOST);

fu.get("/", fu.staticHandler("index.html"));
fu.get("/style.css", fu.staticHandler("style.css"));
fu.get("/client.js", fu.staticHandler("client.js"));
fu.get("/jquery-1.2.6.min.js", fu.staticHandler("jquery-1.2.6.min.js"));

var messages;

Init();

function Init()
{
	var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : 'admin',
      database : 'autozone',
    });
 
	connection.connect();
	var queryString = 'SELECT * FROM users';	
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		
		messages = [];
		
		for (var i in rows) {       
			var data = 
			{
				name: rows[i].username
			};		
			messages.push(data);
		}
	});
	connection.end();
}

fu.get("/load", function (req, res)
{		
	res.simpleJSON(200, { "results": messages });
});

fu.get("/send", function (req, res)
{		
	var text = qs.parse(url.parse(req.url).query).name;
	
	var data = 
	{
		name: text
	};	
	messages.push(data);
	res.simpleJSON(200, { "results": messages });
	
});

fu.get("/clear", function (req, res)
{		
	
	messages = [];
	Init();
	res.simpleJSON(200, { "results": messages });
});




