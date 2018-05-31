import React from "react";
import ReactDOM, { render as _render } from "react-dom";

import $ from "jquery";
import GoldenLayout from "golden-layout";

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;

var myLayout = new GoldenLayout({
	content: [{
		type: 'row',
		content: [{
			type: 'react-component',
			component: 'test-component',
			props: { label: 'A' }
		}, {
			type: 'column',
			content: [{
				type: 'react-component',
				component: 'test-component',
				props: { label: 'B' }
			}, {
				type: 'react-component',
				component: 'test-component',
				props: { label: 'C' }
			}]
		}]
	}]
});

class TestComponent extends React.Component {
	render() {
		return null;
	}
};

myLayout.registerComponent('test-component', TestComponent);
myLayout.init();

ReactDOM.render(<TestComponent />, document.getElementById('CodeStreamer'));
