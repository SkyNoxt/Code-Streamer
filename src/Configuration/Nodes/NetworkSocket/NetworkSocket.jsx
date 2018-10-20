
import React from "react";
import ReactDOM from "react-dom";

import { GUI } from 'dat.gui';
import "./GUI.css";

import Node from "../../Node"

const dgram = window.require('electron').remote.require("dgram");

export default class NetworkSocket extends Node {

	constructor() {
		super("Network Socket", "rgb(255, 192, 0)", new NetworkSocketControls());

		this.options = {
			protocol: 'udp6',
			multicastIP: "",
			port: 1024
		};

		this.packets = this.addOutPort("Packets");
		this.connect();
	}

	connect() {
		this.socket = dgram.createSocket({ type: this.options.protocol, reuseAddr: true });

		this.socket.on("listening", () => {
			if (this.options.multicastIP)
				this.socket.addMembership(this.options.multicastIP);
		});

		this.socket.on("message", (message, info) => {
			this.packets.transmit(message);
		});

		this.socket.bind(this.options.port);
	}

	reconnect() {
		this.socket.close();
		this.connect();
	}
}

class NetworkSocketControls extends React.Component {

	title = "Network Socket";

	componentWillMount() {
		this.node = this.props.node;
	}

	componentDidMount() {
		const gui = new GUI({ hideable: false });

		gui.add(this.node.options, 'protocol', { udp4: "udp4", udp6: "udp6" }).name("Protocol").onFinishChange(() => this.node.reconnect());
		gui.add(this.node.options, 'multicastIP').name("Multicast IP").onFinishChange(() => this.node.reconnect());
		gui.add(this.node.options, 'port').name("Port").onFinishChange(() => this.node.reconnect());

		let DOMNode = ReactDOM.findDOMNode(this);
		DOMNode.appendChild(gui.domElement);
	}

	render() {
		return <div />;
	}
}
