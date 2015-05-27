function getRequest(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	return xhr.responseText;
}

var getDriveResponse = function (url, callback) {
	var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            callback(request.responseText); // Another callback here
        }
    }; 
    request.open('GET', url);
    request.send();
}

function extractIDs(data) {
	var response = JSON.parse(data);
	console.log(response);
	var items = response["items"];
	for (i=0; i<items.length; i++) {
		console.log(items[i]['id']);
	}
}
// TODO output all Drive Files, not just the first 100.
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	// Use the token.
	console.log('Request Token')
	console.log(token)

	console.log('Accessing Drive API')
	var url = 'https://www.googleapis.com/drive/v2/files?access_token=' + token;
	console.log(url);
	getDriveResponse(url, extractIDs);

	// var response = getRequest(url);
	// var data = JSON.parse(response);
	// console.log(data)
	// console.log(response);

	// if (token) {
	// 	// Make a request to revoke token
	// 	console.log('Revoking token')
	// 	console.log(token)
	// 	getRequest('https://accounts.google.com/o/oauth2/revoke?token=' + token);

	// 	chrome.identity.removeCachedAuthToken({ 'token': token }, function () {})
	// 	console.log('Removed token')
	// }
	
});