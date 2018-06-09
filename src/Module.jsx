
import { DefaultLinkModel, DefaultNodeModel, DefaultPortModel } from "storm-react-diagrams";

export class Link extends DefaultLinkModel {

	setTargetPort(port) {
		super.setTargetPort(port);
		if (port == null) return;

		for (var linkID in port.links) {
			if (linkID !== this.id && (port.links[linkID].sourcePort === this.sourcePort || port.links[linkID].targetPort === this.sourcePort))
				return;
		}

		if (!this.targetPort.in && this.sourcePort.in) {
			let source = this.sourcePort;
			this.sourcePort = this.targetPort;
			this.targetPort = source;

			this.sourcePort.linkCallback(this.targetPort);
			this.targetPort.linkCallback(this.sourcePort);
		}
		else if (!this.sourcePort.in && this.targetPort.in) {
			this.sourcePort.linkCallback(this.targetPort);
			this.targetPort.linkCallback(this.sourcePort);
		}
	}
}

class Port extends DefaultPortModel {

	constructor(isInput, label, linkCallback, sampleCallback) {
		super(isInput, "", label);
		this.linkCallback = linkCallback;
		this.sampleCallback = sampleCallback;
	}

	//Make our custom Ports use our custom Links
	createLinkModel(port) {
		return new Link();
	}

	transmit(data) {
		for (var linkID in this.links) {
			if (this.links[linkID].targetPort !== null)
				this.links[linkID].targetPort.sampleCallback(data);
		}
	}

}

class NodeInterface extends DefaultNodeModel {

	constructor(name = "Untitled", color = "rgb(0,192,255)") {
		super(name, color);
	}

	//Make our custom Nodes use our custom Ports
	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	//Make our custom Nodes use our custom Ports
	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

}

export class NodeOut extends NodeInterface {

	constructor() {
		super("Node 1", "rgb(0,192,255)");
		this.out = this.addOutPort("Out", (port) => console.log("Connected to OUT " + port.id), (data) => console.log("NODE OUT SAMPLE CALLBACK " + data));
		this.setPosition(100, 100);

		//Example out
		setInterval(() => {
			this.out.transmit("TestData");
		}, 100);
	}

}

export class NodeIn extends NodeInterface {

	constructor() {
		super("Node 2", "rgb(192,255,0)");
		this.in = this.addInPort("In", (port) => console.log("Connected to IN " + port.id), (data) => console.log("NODE IN SAMPLE CALLBACK " + data));
		this.setPosition(400, 100);
	}

}