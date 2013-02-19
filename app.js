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

var data = [];

var appMySql = {
	
	init: function () {
	
		var connection = mysql.createConnection(
		{
		  host     : 'localhost',
		  user     : 'root',
		  password : 'admin',
		  database : 'nodejs',
		});
		
		connection.connect();
		
		return connection;
	},
	
	load:  function (_queryString)
	{
		var connection = this.init();
		
		connection.query(_queryString, function(err, rows, fields) {
			if (err) throw err;
			
			data = [];
			
			for (var i in rows) {       
				var _data = 
				{
					name: rows[i].username
				};		
				data.push(_data);
			}
		});
		connection.end();
	},
	
	insert: function (_queryString)
	{
		var connection = appMySql.init();
			
		connection.query(_queryString, function(err, info) {
			console.log(info.insertId);
		});
		connection.end();
	},

	remove: function (_queryString)
	{
		var connection = appMySql.init();
			
		connection.query(_queryString, function(err, info) {
			
		});
		connection.end();
	}	
};
	
		
fu.get("/load", function (req, res)
{		
	var queryString = 'select * from users order by id desc';	
	appMySql.load(queryString);	
	
	setTimeout(function() {
	  console.log("loading...");
	  res.simpleJSON(200, { "results": data });
	}, 200);
		
});

fu.get("/send", function (req, res)
{		
	var text = qs.parse(url.parse(req.url).query).name;
	var sqlText = '"' + text + '"';
	var queryString = 
		'insert into users (username) values(' + sqlText + ')';
	
	appMySql.insert(queryString);
			
	var _data = 
	{
		name: text
	};	
	data.push(_data);
	res.simpleJSON(200, { "results": data });
	
});

fu.get("/clear", function (req, res)
{			
	var queryString = 'delete from users';	
	appMySql.remove(queryString);	
	data = [];
	res.simpleJSON(200, { "results": data });
});


fu.get("/refresh", function (req, res)
{				
	data = [];
	res.simpleJSON(200, { "results": data });	
});




