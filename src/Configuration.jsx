import React from "react";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

import { NodeOut, NodeIn, Link, Port } from "./Module"

export default class Configuration extends React.Component {

	componentOpen() {
		var engine = new DiagramEngine();
		engine.installDefaultFactories();

		var diagram = new DiagramModel();
		engine.setDiagramModel(diagram);

		requestAnimationFrame(() => {
			var node1 = new NodeOut();
			var node2 = new NodeIn();
			var node3 = new NodeIn();

			diagram.addAll(node1, node2, node3);

			this.render = () => <DiagramWidget className="configuration" diagramEngine={engine} />;
			this.forceUpdate();
		});

		this.state = { engine: engine, diagram: diagram };
	}

	render() {
		return null;
	}
}