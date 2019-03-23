
import { remote } from "electron";

import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";

import Configuration from "./Configuration/Configuration";

import { NetworkSocketControls } from "./Configuration/Nodes/NetworkSocket/NetworkSocket"
import { ViewportControls } from "./Configuration/Nodes/Viewport/Viewport"

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;

const GoldenLayout = require("golden-layout");

export default class CodeStreamer {
	constructor() {

		ReactDOM.render(<CodeStreamerTitleBar />, document.getElementById("titleBar"));

		var codeStreamer = new GoldenLayout({
			content: [{
				type: "row",
				content: [{
					type: "react-component",
					title: "Configuration",
					component: "Configuration"
				}]
			}]
		}, document.getElementById("CodeStreamer"));

		window.onresize = () => codeStreamer.updateSize();

		codeStreamer.registerComponent(Configuration.name, Configuration);
		codeStreamer.registerComponent(NetworkSocketControls.name, NetworkSocketControls);
		codeStreamer.registerComponent(ViewportControls.name, ViewportControls);

		codeStreamer.on("componentCreated", function (component) {
			component.element.on("click", (event) => component.instance._reactComponent.elementClick(event, component.element));
			component.container.on("resize", (event) => component.instance._reactComponent.containerResize(event, component.container));
			component.container.on("open", (event) => component.instance._reactComponent.containerOpen(event, component.container));
		});

		codeStreamer.init();

		window.codeStreamer = codeStreamer;

		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/golden-layout/src/css/goldenlayout-base.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/golden-layout/src/css/goldenlayout-dark-theme.css\" />");
	}
}

class CodeStreamerTitleBar extends React.Component {

	about() {
		if (this.state.about) {
			this.state.about.close();
			this.state.about = null;
		}
		else
			this.setState({
				about: remote.require("about-window").default({
					icon_path: window.appPath + "/src/img/code-streamer.png",
					product_name: "Code Streamer",
					bug_report_url: "https://www.artempix.net",
					bug_link_text: "artempix.net",
					copyright: "© Copyright 2018 ArtemPix, all rights reserved.",
					description: "Flow Based Programming Framework",
					win_options: { parent: this.state.window, frame: false, resizable: false, skipTaskbar: true },
					css_path: window.appPath + "/src/index.css",
					use_version_info: true
				})
			});
	}

	componentWillMount() {
		this.setState({ window: remote.getCurrentWindow(), about: null });
	}

	render() {
		return (
			<TitleBar window={this.state.window} title="Code Streamer">
				<button onClick={() => this.about()}>?</button>
			</TitleBar>
		);
	}
}

class TitleBar extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div id="titleBarTitle">{this.props.title}</div>
				<div id="titleBarButtons">
					{this.props.children}
					<button onClick={() => this.props.window.minimize()}>-</button>
					<button onClick={() => this.props.window.isMaximized() ? this.props.window.unmaximize() : this.props.window.maximize()}>+</button>
					<button onClick={() => this.props.window.close()}>x</button>
				</div>
			</React.Fragment>
		);
	}
}
