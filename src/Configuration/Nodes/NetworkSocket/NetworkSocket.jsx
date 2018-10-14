
import React from "react";
import ReactDOM from "react-dom";

import { GUI } from 'dat.gui';
import "./GUI.css";

import Node from "../../Node"

export default class NetworkSocket extends Node {

	constructor() {
		super("Network Socket", "rgb(255, 192, 0)", new NetworkSocketControls());

		this.options = {
			protocol: 'udp4',
			multicastIP: "",
			port: 1024
		};

		this.packets = this.addOutPort("Packets", (port) => this.PacketsConnected(port), (packet) => this.PacketSent(packet));

		const socket = window.require('electron').remote.require("dgram").createSocket({ type: "udp4", reuseAddr: true });

		socket.on("listening", () => {
			if (this.options.multicastIP)
				socket.addMembership(this.options.multicastIP);
		});

		socket.on("message", (message, info) => {
			this.packets.transmit(message);
		});

		socket.bind(this.options.port);
	}

	PacketsConnected(port) {
		console.log("Connected Packets " + port);
	}

	PacketSent(packet) {
		console.log("Packet sent " + packet);
	}
}

class NetworkSocketControls extends React.Component {

	title = "Network Socket";

	componentWillMount() {

	}

	componentDidMount() {
		const gui = new GUI({ hideable: false });

		gui.add(this.props.node.options, 'protocol', { udp4: "udp4", udp6: "udp6" }).name("Protocol").onFinishChange((option) => { });
		gui.add(this.props.node.options, 'multicastIP').name("Multicast IP").onFinishChange((option) => { });
		gui.add(this.props.node.options, 'port').name("Port").onFinishChange((option) => { });

		let DOMNode = ReactDOM.findDOMNode(this);
		DOMNode.appendChild(gui.domElement);
	}

	render() {
		return <div />;
	}
}
