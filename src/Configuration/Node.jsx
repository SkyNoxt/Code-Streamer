
import { DefaultNodeModel } from "storm-react-diagrams";
import Port from "./Port";

export default class Node extends DefaultNodeModel {

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
