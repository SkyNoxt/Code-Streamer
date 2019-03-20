
import CodeStreamer from "./CodeStreamer";

import { remote } from "electron";

const browserWindow = remote.getCurrentWindow();
const openAboutWindow = remote.require("about-window").default;

function init() {
	let aboutWindow = null;
	document.getElementById("aboutButton").addEventListener("click", function (e) {
		if (aboutWindow) {
			aboutWindow.close();
			aboutWindow = null;
			this.innerText = '?';
		}
		else {
			aboutWindow = openAboutWindow({
				icon_path: window.appPath + "/src/img/code-streamer.png",
				product_name: "Code Streamer",
				bug_report_url: "https://www.artempix.net",
				bug_link_text: "artempix.net",
				copyright: "© Copyright 2018 ArtemPix, all rights reserved.",
				description: "Flow Based Programming Framework",
				win_options: { parent: browserWindow, frame: false, resizable: false, skipTaskbar: true },
				css_path: window.appPath + "/src/index.css",
				use_version_info: true
			});
			this.innerText = '¿';
		}
	});

	document.getElementById("minimizeButton").addEventListener("click", function (e) {
		browserWindow.minimize();
	});

	document.getElementById("maximizeButton").addEventListener("click", function (e) {
		if (!browserWindow.isMaximized()) {
			browserWindow.maximize();
		} else {
			browserWindow.unmaximize();
		}
	});

	document.getElementById("closeButton").addEventListener("click", function (e) {
		browserWindow.close();
	});
};

document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		init();
	}
};

new CodeStreamer();
