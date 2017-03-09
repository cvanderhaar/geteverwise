'use strict';

var http = require('http');
var express = require('express');
var $ = require('jQuery')(window);
var app = express();
var jsdom = require('jsdom').jsdom; 
var document = jsdom('<html></html>', {});
var window = document.defaultView;
//var $ = require('jquery')(jsdom.jsdom().parentWindow);

//www folder to server up index files...
app.use(express.static('www'));

//fire up server
var httpServer = http.createServer(app);

//listen on port
httpServer.listen(8080, function(err){

    if(err){
        console.log(err.message);
        return;
    }
    //callback funtion
    console.log('web server on port 8080');
});

var AnimationSequence = function(elem, opts) {
    this.element = (typeof elem == "object") ? elem : $(elem); //jQuery
    this.options = opts;
    this.queue = [];
    this.timer = 0;
    this.init(opts);
}
AnimationSequence.prototype = {
    init: function(opts) {
        var that = this;
        for(var i = 0, l = opts.length; i < l; i++) {
            this.queue.push({delay: opts[i][0], command: opts[i][1]});
        }
        this.deQueue();
    },
    deQueue: function() {
        if(this.queue.length) {
            var animation = this.queue.shift(),
                that = this;
            this.timer = setTimeout(function() {
                that.element.animate(animation.command, function() {
                that.deQueue();
            	});
            }, animation.delay);
    	}
	}
};
$(function() {
	var barSequence = new AnimationSequence(".bar", [
  	[100, { width: '10%' }],
  	[200, { width: '20%' }],
  	[200, { width: '50%' }],
  	[200, { width: '80%' }],
  	[300, { width: '90%' }],
  	[100, { width: '100%' }]
	]);
});