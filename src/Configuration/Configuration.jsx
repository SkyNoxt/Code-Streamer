import React from "react";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

import Node, { NodeFactory } from "./Node"

export default class Configuration extends React.Component {

	constructor(props) {
		super(props);

		var engine = new DiagramEngine();
		engine.installDefaultFactories();
		engine.registerNodeFactory(new NodeFactory());

		var diagram = new DiagramModel();

		engine.setDiagramModel(diagram);

		var node1 = new NodeOut();
		var node2 = new NodeIn();
		var node3 = new NodeIn();
		node3.setPosition(400, 200);

		diagram.addAll(node1, node2, node3);

		this.render = () => <DiagramWidget className="configuration" diagramEngine={engine} />;

		window.diagram = diagram;
	}

	render() {
		return null;
	}
}

class NodeOut extends Node {

	constructor() {
		super("Node 1", "rgb(0,192,255)", new NodeOutControls());
		this.out = this.addOutPort("Out", (port) => console.log("Connected to OUT " + port.id), (data) => console.log("NODE OUT SAMPLE CALLBACK " + data));
		this.setPosition(100, 100);

		//Example out
		setInterval(() => {
			this.out.transmit("TestData");
		}, 100);
	}
}

class NodeOutControls extends React.Component {

	title = "NodeOut Controls";
	name = "NodeOutControls";

	render() {
		return (<div onClick={() => { console.log(window.diagram.getNode(this.state.node)) }} className='props'>NODE PROPS HTML</div>);
	}
}

class NodeIn extends Node {

	constructor() {
		super("Node 2", "rgb(192,255,0)");
		this.in = this.addInPort("In", (port) => console.log("Connected to IN " + port.id), (data) => console.log("NODE IN SAMPLE CALLBACK " + data));
		this.setPosition(400, 100);
	}

}