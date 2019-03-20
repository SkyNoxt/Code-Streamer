
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

		ReactDOM.render(<TitleBar />, document.getElementById("titleBar"));

		var codeStreamer = new GoldenLayout({
			content: [{
				type: 'row',
				content: [{
					type: 'react-component',
					title: "Configuration",
					component: 'Configuration'
				}]
			}]
		}, document.getElementById('CodeStreamer'));

		window.onresize = () => codeStreamer.updateSize();

		codeStreamer.registerComponent('Configuration', Configuration);
		codeStreamer.registerComponent("NetworkSocketControls", NetworkSocketControls);
		codeStreamer.registerComponent("ViewportControls", ViewportControls);

		codeStreamer.on('componentCreated', function (component) {
			component.element.on("click", (event) => component.instance._reactComponent.elementClick(event, component.element));
			component.container.on('resize', (event) => component.instance._reactComponent.containerResize(event, component.container));
			component.container.on('open', (event) => component.instance._reactComponent.containerOpen(event, component.container));
		});

		codeStreamer.init();

		window.codeStreamer = codeStreamer;

		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/golden-layout/src/css/goldenlayout-base.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/golden-layout/src/css/goldenlayout-dark-theme.css\" />");
	}
}

export class TitleBar extends React.Component {

	componentWillMount() {
		this.setState({ window: remote.getCurrentWindow() })
	}

	render() {
		return (
			<React.Fragment>
				<div id="title">Code Streamer</div>
				<div id="titleBarButtons">
					<button>?</button>
					<button onClick={() => this.state.window.minimize()}>-</button>
					<button onClick={() => this.state.window.isMaximized() ? this.state.window.unmaximize() : this.state.window.maximize()}>+</button>
					<button onClick={() => this.state.window.close()}>x</button>
				</div>
			</React.Fragment>
		);
	}
}
