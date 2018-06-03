import React from "react";

import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

export default class Configuration extends React.Component {
	constructor(props) {
		super(props);

		var engine = new DiagramEngine();
		engine.installDefaultFactories();

		var diagram = new DiagramModel();
		engine.setDiagramModel(diagram);

		this.props.glEventHub.on("layoutDidMount", () => {
			console.log("layoutDidMount");
		});

		this.state = { engine: engine, diagram: diagram };
	}

	componentDidMount() {
		var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
		let port1 = node1.addOutPort("Out");
		node1.setPosition(100, 100);

		var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
		let port2 = node2.addInPort("In");
		node2.setPosition(400, 100);

		let link1 = port1.link(port2);
		link1.addLabel("Hello World!");

		this.state.diagram.addAll(node1, node2, link1);
	}

	render() {
		return <DiagramWidget className="configuration" diagramEngine={this.state.engine} />
	}
}