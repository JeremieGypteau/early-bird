var http = require('http');

http.ServerResponse.prototype.respond = function (content, status) {
    if ('undefined' == typeof status) { // only one parameter found
        if ('number' == typeof content || !isNaN(parseInt(content))) { // usage "respond(status)"
            status = parseInt(content);
            content = undefined;
        } else { // usage "respond(content)"
            status = 200;
        }
    }
    if (status < 200 || status >= 300) { // error
        content = {
            "code":    status,
            "status":  http.STATUS_CODES[status],
            "message": content && content.toString() || null
        };
    } else {
        content = {data: content};
    }
    // respond with JSON data
    if ((this.headersSent) == false){
        this.contentType("application/json");
        this.status(status).send(JSON.stringify(content));
    }
};

http.ServerResponse.prototype.respondWithLog = function(content, status, err){
    if (typeof err !=  'undefined')
        console.log(err);
    if (typeof err ==  'undefined'){
        console.log(status);
        err = status;
        status = content;
        content = '';
        if (typeof err != 'undefined' && err != null)
            content = err.message;
    }
    this.respond(content, status);
};