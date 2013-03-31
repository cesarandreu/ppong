#Projected Pong


***


##What is this?
This is a project done in HackPR's first UPRM hackathon. We won the prize for Best Web Development Hack. The team was awarded $100.

Our idea was to create a system which allows a game to be projected or shown on a screen while players control their character from their own devices. 

This could be used to great effect in a place such as a bar. The bartender can set-up a projector with a computer running the platform. Then patrons can connect to the server with their smartphones to play and interact with other players.

Since we were working with such limited time we created a pong game to demonstrate the functionality and how entertaining it can be. In this version you run the web server and go to */gameview*, here you can see the game. Then players go to */p1* and */p2* (in the case of this demo you must use a computer), and they can control their respective paddles using the UP and DOWN arrow keys.


***


##Technologies used
 * NodeJS
 * ExpressJS
 * JQuery
 * SocketIO
 * HTML5 Canvas 


***


##How do I try this?
Clone this repository and run *npm install* from inside the folder. Then run the node application with *node app.js*. 
Now if you go to *localhost:3000/gameview* on your browser you should see a pong game. Go to *localhost:3000/p1* or *localhost:3000/p2* to control Player 1 and Player 2 respectively. 


***


##More information
You can find more information about the event in the hackathon's Hacker League page:
<https://www.hackerleague.org/hackathons/hackpr-1st-hackathon-at-uprm>


The hackathon received coverage from a local digital newspaper as well, which can be found here:
<http://www.noticel.com/noticia/138236/>