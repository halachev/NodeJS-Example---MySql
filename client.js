$(document).ready(function () {
		
	$('#btnLoad').click(function () {
		
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
		
		var _data = 
		{
		  name: $('#username').val()
		};
		
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
			}
		});
	
	});	


	$('#btnClear').click(function () {
				
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
	
	function ShowData(res)
	{
		var container = $("#container");	
		container.html("");				
		var html = "";
		for (var i in res.results) {  
			html += '<p>' + res.results[i].name + '</p>';
		}
				
		container.html(html);
		
	}
	
});