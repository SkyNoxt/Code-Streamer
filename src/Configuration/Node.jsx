
import React from "react";
import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

export class NodeFactory extends DefaultNodeFactory {

	//Make our Custom Nodes use our custom NodeWidgets

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="node-wrapper" onDoubleClick={() => node.showProperties()}>
				<DefaultNodeWidget node={node} />
			</div>
		);
	}

	getNewInstance() {
		return new Node();
	}
}

export default class Node extends DefaultNodeModel {

	//Make our custom Nodes use our custom Ports
	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	//Make our custom Nodes use our custom Ports
	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

	registerProperties(properties) {
		window.CodeStreamer.registerComponent(properties.name, function (container, state) {
			container.getElement().html(properties.render());
		});
	}

	showProperties() {
		var nodeProperties = {
			type: 'component',
			title: this.Properties.title,
			componentName: this.Properties.name,
			componentState: this.Properties.state
		};
		window.CodeStreamer.root.contentItems[0].addChild(nodeProperties);
	}
}
