
import React from "react";
import ReactDOM from "react-dom";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";
import Port from "./Port";

import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";

export class NodeFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, node) {
		return (
			<div className="node-wrapper" onDoubleClick={() => node.controls.show()}>
				<ContextMenuTrigger holdToDisplay={-1} id={node.id}>
					<DefaultNodeWidget node={node} />
				</ContextMenuTrigger>
				{diagramEngine.contextWrapper && ReactDOM.createPortal(node.contextMenu(), diagramEngine.contextWrapper)}
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
			this.controls = controls;
			this.controls.node = this;
		}
	}

	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

	contextMenu() {
		return (
			<ContextMenu id={this.id}>
				{this.contextOptions()}
			</ContextMenu>
		);
	}

	contextOptions() {
		return (
			<React.Fragment>
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 1
				</MenuItem>
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 2
				</MenuItem>
				<MenuItem divider />
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 3
				</MenuItem>
			</React.Fragment>
		);
	}
}

export class NodeWindow extends React.Component {

	constructor(props) {
		super(props);
	}

	show() {
		var component = {
			type: "react-component",
			title: this.node.name,
			component: this.constructor.name,
			props: { node: this.node.id }
		};
		window.codeStreamer.root.contentItems[0].addChild(component);
	}

	componentDidMount() {
		/*if (window.codeStreamer.isSubWindow) {
			let aboutButton = document.getElementById("about-btn");
			aboutButton.parentNode.removeChild(aboutButton);
			document.body.prepend(document.getElementById("title-bar"));
		}*/
	}

	elementClick(event, element) {
		event.target.focus()
	}

	containerOpen(event, container) {

	}

	containerResize(event, container) {

	}
}