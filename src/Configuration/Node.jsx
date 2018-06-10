
import React from "react";
import { AbstractNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

export class NodeFactory extends AbstractNodeFactory {
	constructor() {
		super("Node");
	}

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="nodeWrapper" onClick={() => { console.log("CLICK!") }}>
				<DefaultNodeWidget node={node} />
			</div>
		);
	}

	getNewInstance() {
		return new Node();
	}
}

export default class Node extends DefaultNodeModel {

	constructor() {
		super();
		this.type = "Node";
	}

	//Make our custom Nodes use our custom Ports
	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	//Make our custom Nodes use our custom Ports
	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

}