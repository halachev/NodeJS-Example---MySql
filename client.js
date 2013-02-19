$(document).ready(function () {
	var process = $('#process');
	
	$('#btnLoad').click(function () {
		process.html("Loading...");
		
		$.ajax({ 
			cache: false, 
			type: "GET", 
			dataType: "json", 
			url: "/load", 		
			error: function (err)
			{
				alert("error");
			}, 
			success: function (res) 
			{		
				ShowData(res);
			}
		});
	
	});		
	
		
	$('#btnSend').click(function () {
		var _name = $('#username').val();
		
		if (!_name)
		{
				
			process.html("Please enter username!");
			return false;			
		}
		
		var _data = 
		{
		  name: _name
		};
		process.html("Loading...");
		$.ajax({ 			
			type: "GET", 			
			dataType: "json", 
			url: "/send",
			data: _data,
			error: function (err)
			{
				alert("error");
			}, 
			success: function (res) 
			{		
				
				ShowData(res);
				$('#username').val('');
			}
		});
	
	});	


	$('#btnClear').click(function () {
		var c = confirm("Are you sure to delete DB?");

		if (!c) return;
		process.html("Loading...");		
		$.ajax({ 			
			type: "GET", 			
			dataType: "json", 
			url: "/clear",			
			error: function (err)
			{
				alert("error");
			}, 
			success: function (res) 
			{						
				ShowData(res);
			}
		});
	
	});	


    $('#btnRefresh').click(function () {
		
		$.ajax({ 			
			type: "GET", 			
			dataType: "json", 
			url: "/refresh",			
			error: function (err)
			{
				alert("error");
			}, 
			success: function (res) 
			{		
				
				ShowData(res);
			}
		});
	
	});			
	
	function ShowData(res)
	{	
			
		var container = $("#container");	
		container.html("");				
		var html = '<table border="1"><th style="margin: 10px;background: #f5f5f5; color: #2d2d2d;">User Name</th><tr>';
		for (var i in res.results) {  
			
			html += '<tr><td style="padding: 10px;">' + res.results[i].name + '</td></tr>';
		}
			
		html += '</tr></table>';
		container.html(html);
		process.html("");
	}
	
});