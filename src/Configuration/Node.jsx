
import React from "react";
import ReactDOM from "react-dom";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

import { ContextMenuTrigger } from "react-contextmenu";

export class NodeFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="node-wrapper" onDoubleClick={() => node.showControls()}>
				<ContextMenuTrigger holdToDisplay={-1} id={node.id}>
					<DefaultNodeWidget node={node} />
				</ContextMenuTrigger>
				{node.getContextMenu && diagramEngine.contextWrapper && ReactDOM.createPortal(node.getContextMenu(), diagramEngine.contextWrapper)}
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
			/*if (!(controls.constructor in window.codeStreamer._components))
				window.codeStreamer.registerComponent(controls.constructor, controls.constructor);*/
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
			component: "NetworkSocketControls",
			props: { node: this.id }
		};
		window.codeStreamer.root.contentItems[0].addChild(controls);
	}
}

export class NodeWindow extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (window.codeStreamer.isSubWindow) {
			let aboutButton = document.getElementById("about-btn");
			aboutButton.parentNode.removeChild(aboutButton);
			document.body.prepend(document.getElementById("title-bar"));
		}
	}

	elementClick(event, element) {
		event.target.focus()
	}

	containerOpen(event, container) {

	}

	containerResize(event, container) {

	}
}