
			document.write("Hello");

			var socket = io.connect('http://localhost');
			
			document.onkeydown = keypress;

			function keypress(e)
			{	
				var key = window.event || e;
				var keyCode = key.charCode || e.keyCode;

 				if(keyCode == 38){
 					
 					socket.emit('movementUp', {data: true}, function(position)
 						{
 							console.log(position);
 						});
 				
 				}

 				if(keyCode == 40){
 					
 					socket.emit('movementDown', {data: true}, function(position)
 						{
 							console.log(position);
 						});

 				
 				}


			}			