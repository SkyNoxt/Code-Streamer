import React from "react";
import ReactDOM, { render as _render } from "react-dom";

import $ from "jquery";
import GoldenLayout from "golden-layout";

import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DiagramWidget,
	DefaultLinkModel
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;

var myLayout = new GoldenLayout({
	content: [{
		type: 'row',
		content: [{
			title: "Configuration",
			type: 'react-component',
			component: 'Configuration',
			props: { label: 'A' }
		}, {
			type: 'column',
			content: [{
				title: "Title 2",
				type: 'react-component',
				component: 'TestComponent',
				props: { label: 'B' }
			}, {
				title: "Title 3",
				type: 'react-component',
				component: 'TestComponent',
				props: { label: 'C' }
			}]
		}]
	}]
});

class Configuration extends React.Component {
	constructor(props) {
		super(props);

		var engine = new DiagramEngine();
		engine.installDefaultFactories();

		var model = new DiagramModel();

		//3-A) create a default node
		var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
		let port1 = node1.addOutPort("Out");
		node1.setPosition(100, 100);

		//3-B) create another default node
		var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
		let port2 = node2.addInPort("In");
		node2.setPosition(400, 100);

		// link the ports
		let link1 = port1.link(port2);
		link1.addLabel("Hello World!");

		//4) add the models to the root graph
		model.addAll(node1, node2, link1);

		//5) load model into engine
		engine.setDiagramModel(model);

		this.state = { engine: engine, model: model };
	}

	render() {
		return <DiagramWidget className="configuration" diagramEngine={this.state.engine} />
	}
}

class TestComponent extends React.Component {
	render() {
		return <div>{this.props.label}</div>;
	}
};

myLayout.registerComponent('TestComponent', TestComponent);
myLayout.registerComponent('Configuration', Configuration);
myLayout.init();

ReactDOM.render(<TestComponent />, document.getElementById('CodeStreamer'));
