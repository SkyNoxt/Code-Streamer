
import CodeStreamer from "../src/CodeStreamer";

const remote = window.require('electron').remote;

const browserWindow = remote.getCurrentWindow();
const openAboutWindow = remote.require("about-window").default;

function init() {
	let aboutWindow = null;
	document.getElementById("about-btn").addEventListener("click", function (e) {
		if (aboutWindow) {
			aboutWindow.close();
			aboutWindow = null;
			this.innerText = '?';
		}
		else {
			let appPath = remote.app.getAppPath();
			aboutWindow = openAboutWindow({
				icon_path: appPath + "/build/img/code-streamer.png",
				product_name: "Code Streamer",
				bug_report_url: "https://www.artempix.net",
				bug_link_text: "artempix.net",
				copyright: "© Copyright 2018 ArtemPix, all rights reserved.",
				description: "Flow Based Programming Framework",
				win_options: { parent: browserWindow, frame: false, resizable: false, skipTaskbar: true },
				css_path: appPath + "/build/index.css",
				use_version_info: true
			});
			this.innerText = '¿';
		}
	});

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
	if (document.readyState === "complete") {
		init();
	}
};


new CodeStreamer();
