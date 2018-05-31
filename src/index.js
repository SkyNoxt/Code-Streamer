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
			component: 'TestComponent',
			props: { label: 'A' }
		}, {
			type: 'column',
			content: [{
				type: 'react-component',
				component: 'TestComponent',
				props: { label: 'B' }
			}, {
				type: 'react-component',
				component: 'TestComponent',
				props: { label: 'C' }
			}]
		}]
	}]
});

class TestComponent extends React.Component {
	render() {
		return <div>{ this.props.label }</div>;
	}
};

myLayout.registerComponent('TestComponent', TestComponent);
myLayout.init();

ReactDOM.render(<TestComponent />, document.getElementById('CodeStreamer'));
