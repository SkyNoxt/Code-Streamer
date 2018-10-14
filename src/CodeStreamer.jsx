
import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";
import GoldenLayout from "golden-layout";

import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

import Configuration from "./Configuration/Configuration";

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;

export default class CodeStreamer extends React.Component {
	constructor(props) {
		super(props);
		var codeStreamer = new GoldenLayout({
			settings: {
				showPopoutIcon: false
			},
			content: [{
				type: 'row',
				content: [{
					type: 'react-component',
					title: "Configuration",
					component: 'Configuration'
				}]
			}]
		});

		codeStreamer.registerComponent('Configuration', Configuration);

		codeStreamer.on('componentCreated', function (component) {
			component.element.on("click", (event) => event.target.focus());
			component.container.on('resize', () => component.instance._reactComponent.componentResize && component.instance._reactComponent.componentResize(component.container));
			component.container.on('open', () => component.instance._reactComponent.componentOpen && component.instance._reactComponent.componentOpen(component.container));
		});

		codeStreamer.init();

		window.codeStreamer = codeStreamer;
	}

	render() {
		return null;
	}
}
