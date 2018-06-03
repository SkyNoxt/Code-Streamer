import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";
import GoldenLayout from "golden-layout";

import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

import Configuration from "./Configuration";

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;

export default class CodeStreamer extends React.Component {
	constructor(props) {
		super(props);
		var codeStreamer = new GoldenLayout({
			content: [{
				type: 'row',
				content: [{
					title: "Configuration",
					type: 'react-component',
					component: 'Configuration',
				}]
			}]
		});

		codeStreamer.registerComponent('Configuration', Configuration);

		codeStreamer.on('componentCreated', function (component) {
			component.container.on('open', () => component.instance._reactComponent.componentOpen());
		});

		codeStreamer.init();
	}

	render() {
		return null;
	}
}