
import CodeStreamer from "../src/CodeStreamer";

const remote = window.require('electron').remote;

const browserWindow = remote.getCurrentWindow();
const openAboutWindow = remote.require("about-window").default;

function init() {
	document.getElementById("about-btn").addEventListener("click", function (e) {
		const icon = remote.app.getAppPath() + "/build/img/code-streamer.png";
		openAboutWindow({
			icon_path: icon,
			product_name: "Code Streamer",
			//package_json_dir: "",
			bug_report_url: "www.bitfeeling.net",
			bug_link_text: "BitFeeling",
			copyright: "© Copyright 2018 BitFeeling, all rights reserved.",
			homepage: "www.bitfeeling.net",
			description: "Flow Based Programming Framework",
			//license: "",
			win_options: { parent: browserWindow, modal: true, resizable: false, skipTaskbar: true, icon: icon },
			//css_path: [ "" ],
			//adjust_window_size: false,
			//open_devtools: false,
			//use_inner_html: false,
			use_version_info: true
		});
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
	if (document.readyState == "complete") {
		init();
	}
};


new CodeStreamer();
