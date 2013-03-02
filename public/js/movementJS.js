	document.write("Hello");

			var socket = io.connect('http://localhost');
			
			document.onkeydown = keydown;
			document.onkeyup = keyup;

			function keydown(e)
			{	
				var key = window.event || e;
				var keyCode = key.charCode || e.keyCode;
				
 				if(keyCode == 38){
 					console.log("Pressed");
 					socket.emit('pressedUp', {data: true}, function(position)
 						{	
 							console.log(position);
 						});
 				
 				}

 				if(keyCode == 40){
 					console.log("Pressed");
 					socket.emit('pressedDown', {data: true}, function(position)
 						{
 							console.log(position);
 						});

 				
 				}


			}	
			function keyup(e)
			{	
				var key = window.event || e;
				var keyCode = key.charCode || e.keyCode;
				
 				if(keyCode == 38){
 					console.log("Released");
 					socket.emit('releasedUp', {data: true}, function(position)
 						{	
 							console.log(position);
 						});
 				
 				}

 				if(keyCode == 40){
 					console.log("Released");
 					socket.emit('releasedDown', {data: true}, function(position)
 						{
 							console.log(position);
 						});

 				
 				}