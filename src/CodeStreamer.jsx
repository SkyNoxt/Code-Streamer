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
		
		this.state = { codeStreamer: codeStreamer }
	}

	componentDidMount() {
		this.state.codeStreamer.init();
		this.state.codeStreamer.eventHub.emit('layoutDidMount');
	}

	render() {
		return null;
	}
}