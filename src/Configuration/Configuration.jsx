import React from "react";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

import { NodeFactory } from "./Node"
import StreamVisualizer from "./Nodes/StreamVisualizer"

export default class Configuration extends React.Component {

	constructor(props) {
		super(props);

		var engine = new DiagramEngine();
		engine.installDefaultFactories();
		engine.registerNodeFactory(new NodeFactory());

		var diagram = new DiagramModel();

		engine.setDiagramModel(diagram);

		var streamVisualizer = new StreamVisualizer();
		var streamVisualizer2 = new StreamVisualizer();
		diagram.addAll(streamVisualizer, streamVisualizer2);

		this.render = () => <DiagramWidget className="configuration" diagramEngine={engine} />;
	}

	render() {
		return null;
	}
}