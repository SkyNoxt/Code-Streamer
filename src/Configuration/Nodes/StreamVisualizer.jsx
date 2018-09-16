
import React from "react";
import ReactDOM from "react-dom";

import * as THREE from 'three';

import Node from "../Node"

export default class StreamVisualizer extends Node {

	constructor() {
		super("Stream Visualizer", "rgb(192,255,0)", new StreamVisualizerControls());

		this.primitives = this.addInPort("Primitives", (port) => this.primitivesConnected(port), (primitive) => this.primitivesReceived(primitive));
	}

	primitivesConnected(port) {
		console.log("Connected Primitive " + port);
	}

	primitivesReceived(primitive) {
		console.log("Primitive received " + primitive);
	}
}

class StreamVisualizerControls extends React.Component {

	title = "Stream Visualizer";

	componentWillMount() {
		let renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);

		this.setState({ renderer: renderer });
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).appendChild(this.state.renderer.domElement);
	}

	componentResize(container) {
		this.state.renderer.setSize(container.width, container.height);
	}

	render() {
		return <div />;
	}
}