
import CodeStreamer from "../src/CodeStreamer";

const remote = window.require('electron').remote;

function init() {
	document.getElementById("min-btn").addEventListener("click", function (e) {
		remote.getCurrentWindow().minimize();
	});

	document.getElementById("max-btn").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		if (!window.isMaximized()) {
			window.maximize();
		} else {
			window.unmaximize();
		}
	});

	document.getElementById("close-btn").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow().close();
	});
};

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		init();
	}
};


new CodeStreamer();
