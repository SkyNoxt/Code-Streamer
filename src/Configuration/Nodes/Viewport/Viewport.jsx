
import React from "react";
import ReactDOM from "react-dom";

import * as THREE from "three";
import OrbitControls from "./OrbitControls"

import Node from "../../Node"

export default class Viewport extends Node {

	constructor() {
		super("Viewport", "rgb(192,255,0)", new ViewportControls());

		this.primitives = this.addInPort("Primitives", (port) => this.primitivesConnected(port), (primitive) => this.primitivesReceived(primitive));
	}

	primitivesConnected(port) {
		console.log("Connected Primitive " + port);
	}

	primitivesReceived(primitive) {
		console.log("Primitive received " + primitive);
	}
}

class ViewportControls extends React.Component {

	title = "Viewport";

	componentWillMount() {
		let renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);

		let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 10;

		let scene = new THREE.Scene();

		let gridHelper = new THREE.GridHelper(500, 100, 0x00ff00, 0x808080);

		gridHelper.position.y = -5;
		gridHelper.position.x = 0;
		
		scene.add(gridHelper);

		this.setState({ renderer: renderer, camera: camera, scene: scene });
	}

	componentDidMount() {
		let DOMNode = ReactDOM.findDOMNode(this);
		DOMNode.appendChild(this.state.renderer.domElement);
		var controls = new OrbitControls(this.state.camera, DOMNode);
		this.animate();
	}

	componentResize(container) {
		this.state.camera.aspect = container.width / container.height;
		this.state.camera.updateProjectionMatrix();
		this.state.renderer.setSize(container.width, container.height);
	}

	animate() {
		requestAnimationFrame(() => this.animate());
		this.state.renderer.render(this.state.scene, this.state.camera);
	}

	render() {
		return <div />;
	}
}