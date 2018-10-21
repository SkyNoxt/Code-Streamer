
import React from "react";
import ReactDOM from "react-dom";

import * as THREE from "three";
import OrbitControls from "./OrbitControls";

import * as Stats from "stats.js";
import "./Stats.css";

import Node from "../../Node";

export default class Viewport extends Node {

	constructor() {
		super("Viewport", "rgb(192, 255, 0)", new ViewportControls());

		this.primitives = this.addInPort("Primitives", (port) => this.primitivesConnected(port), (primitive) => this.primitiveReceived(primitive));
	}

	primitivesConnected(port) {
		console.log("Connected Primitive " + port);
	}

	primitiveReceived(primitive) {
		console.log("Primitive received " + primitive);
	}
}

class ViewportControls extends React.Component {

	title = "Viewport";

	componentWillMount() {
		let stats = new Stats();
		stats.dom.className = "stats";

		let renderer = new THREE.WebGLRenderer();
		renderer.domElement.tabIndex = 0;
		renderer.setClearColor(0x222222);
		renderer.setPixelRatio(window.devicePixelRatio);

		let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 10;

		let scene = new THREE.Scene();

		let gridHelper = new THREE.GridHelper(500, 100, 0x00ff00, 0x000000);

		gridHelper.position.y = -5;
		gridHelper.position.x = 0;

		scene.add(gridHelper);

		this.setState({ stats: stats, renderer: renderer, camera: camera, scene: scene });
	}

	componentDidMount() {
		let DOMNode = ReactDOM.findDOMNode(this);
		DOMNode.appendChild(this.state.renderer.domElement);
		DOMNode.appendChild(this.state.stats.dom);

		new OrbitControls(this.state.camera, DOMNode);

		this.animate();
	}

	componentResize(container) {
		let camera = this.state.camera;
		camera.aspect = container.width / container.height;
		camera.updateProjectionMatrix();
		this.state.renderer.setSize(container.width, container.height);
	}

	animate() {
		this.state.stats.begin();
		this.state.renderer.render(this.state.scene, this.state.camera);
		this.state.stats.end();
		requestAnimationFrame(() => this.animate());
	}

	render() {
		return <div />;
	}
}
