
document.write("Hello there, I am receiving your info");
var host = "http://"+window.location.hostname;
var socket = io.connect(host);
var userInformation = {

	appName: window.navigator.appName,
	appVersion: window.navigator.appVersion,
	buildId: window.navigator.appVersion,
	connection: window.navigator.connection,
	id: window.navigator.id,
	language: window.navigator.language,
	osSystem: window.navigator.oscpu,
	browserPlatform: window.navigator.browserPlatform,
	userAgent: window.navigator.userAgent


};



socket.emit('getInformation', userInformation, function(data)
	{
		for(i in data) {
        document.write("</br>" + i + ": " + data[i]);
    }
	}
	);

