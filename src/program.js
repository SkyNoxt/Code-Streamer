
require("@babel/register");
var app = require("src/CodeStreamer.jsx");

new app.Window("src/index.html", {
	width: 1280,
	height: 720,
	frame: false,
	icon: "img/code-streamer.png"
}, app.CodeStreamer);
