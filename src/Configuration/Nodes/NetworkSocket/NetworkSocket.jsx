
import Node from "../../Node"

export default class NetworkSocket extends Node {

	constructor() {
		super("Network Socket", "rgb(255, 192, 0)");

		this.primitives = this.addOutPort("Packets", (port) => this.PacketsConnected(port), (packet) => this.PacketSent(packet));
		
		const socket = window.require('electron').remote.require("dgram").createSocket({ type: "udp4", reuseAddr: true });

		socket.on("listening", function () {
			socket.addMembership("224.111.111.111");
		});

		socket.on("message", function (message, info) {
			console.info("Message from: " + info.address + ":" + info.port + " " + message);
		});

		socket.bind(22017);
	}

	PacketsConnected(port) {
		console.log("Connected Packets " + port);
	}

	PacketSent(packet) {
		console.log("Packet received " + packet);
	}
}