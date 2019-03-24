
import React from "react";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";

import { Menu, MenuProvider } from 'react-contexify';

import Port from "./Port";

export class NodeFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, node) {
		return (
			<React.Fragment>
				<MenuProvider id={node.id}>
					<DefaultNodeWidget node={node} />
				</MenuProvider>
				{node.contextMenu()}
			</React.Fragment>
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
			<Menu id={this.id} animation="fade">
				{this.contextOptions()}
			</Menu>
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