

	document.write("Hello");
			
			var host = "http://"+window.location.hostname;
			var socket = io.connect(host);
			var id = window.location.toString();
			var	buttonFlag = true;
			
			document.onkeydown = keydown;
			document.onkeyup = keyup;


        $('#up').bind('touchstart mousedown', function(){
        	console.log('TOUCHSTART!');
        	document.body.style.backgroundColor = '#00FF00';
 			socket.emit('movementUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});        
 		});
        $('#down').bind('touchstart mousedown', function(){
        	console.log('TOUCHEND!');
        	document.body.style.backgroundColor = '#FF0000';
 			socket.emit('releasedUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});

        });	

        $('#up').bind('touchnend mouseup', function(){
        	console.log('TOUCHSTART!');
        	document.body.style.backgroundColor = '#00FF00';
 			socket.emit('movementUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});        
 		});
        $('#down').bind('touchend mouseup', function(){
        	console.log('TOUCHEND!');
        	document.body.style.backgroundColor = '#FF0000';
 			socket.emit('releasedUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});

        });	


		

        function keydown(e)
			{	
				var key = window.event || e;
				var keyCode = key.charCode || e.keyCode;
				
 				if(keyCode == 38 && buttonFlag){
 					console.log("Pressed");
 					socket.emit('movementUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});
 					buttonFlag = false;
 				
 				}

 				if(keyCode == 40 && buttonFlag){
 					console.log("Pressed");
 					socket.emit('movementDown', {data: true, player:id.charAt(id.length-1)}, function(position)
 						{
 							console.log(position);
 						});

 					buttonFlag = false;
 				}


			}	
			function keyup(e)
			{	
				var key = window.event || e;
				var keyCode = key.charCode || e.keyCode;
				
 				if(keyCode == 38){
 					console.log("Released");
 					socket.emit('releasedUp', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{	
 							console.log(position);
 						});
 					buttonFlag = true;
 				}

 				if(keyCode == 40){
 					console.log("Released");
 					socket.emit('releasedDown', {data: true, player: id.charAt(id.length-1)}, function(position)
 						{
 							console.log(position);
 						});
 					buttonFlag = true;

 				
 				}
 			}



