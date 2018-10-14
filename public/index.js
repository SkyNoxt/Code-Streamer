
import CodeStreamer from "../src/CodeStreamer";

var browserWindow = window.require('electron').remote.getCurrentWindow();

function init() {
	document.getElementById("min-btn").addEventListener("click", function (e) {
		browserWindow.minimize();
	});

	document.getElementById("max-btn").addEventListener("click", function (e) {
		if (!browserWindow.isMaximized()) {
			browserWindow.maximize();
		} else {
			browserWindow.unmaximize();
		}
	});

	document.getElementById("close-btn").addEventListener("click", function (e) {
		browserWindow.close();
	});
};

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		init();
	}
};


new CodeStreamer();
