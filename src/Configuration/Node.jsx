
import React from "react";
import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

export class NodeFactory extends DefaultNodeFactory {

	//Make our Custom Nodes use our custom NodeWidgets

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="node-wrapper" onDoubleClick={() => node.showControls()}>
				<DefaultNodeWidget node={node} />
			</div>
		);
	}

	getNewInstance() {
		return new Node();
	}
}

export default class Node extends DefaultNodeModel {

	constructor(name, color, controls) {
		super(name, color);
		if (controls) {
			window.CodeStreamer.registerComponent(controls.name, controls.constructor);
			this.controls = controls;
		}
	}

	//Make our custom Nodes use our custom Ports
	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	//Make our custom Nodes use our custom Ports
	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

	showControls() {
		if (!this.controls) {
			alert("No controls in node!");
			return;
		}
		var controls = {
			type: 'react-component',
			title: this.controls.title,
			component: this.controls.name,
			componentState: { node: this }
		};
		window.CodeStreamer.root.contentItems[0].addChild(controls);
	}
}
