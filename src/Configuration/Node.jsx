
import React from "react";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

import { ContextMenuTrigger } from "react-contextmenu";

export class NodeFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="node-wrapper" onDoubleClick={() => node.showControls()}>
				<ContextMenuTrigger holdToDisplay="-1" id={node.id}>
					<DefaultNodeWidget node={node} />
				</ContextMenuTrigger>
				{node.getContextMenu && node.getContextMenu(diagramEngine)}
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
			if (!(controls.constructor in window.codeStreamer._components))
				window.codeStreamer.registerComponent(controls.constructor, controls.constructor);
			this.controls = controls;
		}
	}

	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

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
			component: this.controls.constructor,
			props: { node: this }
		};
		window.codeStreamer.root.contentItems[0].addChild(controls);
	}
}
