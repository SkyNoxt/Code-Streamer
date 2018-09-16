import React from "react";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

import { NodeFactory } from "./Node"
import Viewport from "./Nodes/Viewport/Viewport"

export default class Configuration extends React.Component {

	constructor(props) {
		super(props);

		let engine = new DiagramEngine();
		engine.installDefaultFactories();
		engine.registerNodeFactory(new NodeFactory());

		let diagram = new DiagramModel();

		engine.setDiagramModel(diagram);

		let viewport = new Viewport();
		diagram.addAll(viewport);

		this.render = () => <DiagramWidget className="configuration" diagramEngine={engine} />;
	}

	render() {
		return null;
	}
}