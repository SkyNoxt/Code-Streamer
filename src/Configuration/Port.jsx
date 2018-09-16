
import { DefaultPortModel } from "storm-react-diagrams";
import Link from "./Link";

export default class Port extends DefaultPortModel {

	constructor(isInput, label, linkCallback, sampleCallback) {
		super(isInput, label);
		this.linkCallback = linkCallback || function () { };
		this.sampleCallback = sampleCallback || function () { };
	}

	//Make our custom Ports use our custom Links
	createLinkModel() {
		return new Link();
	}

	transmit(data) {
		for (var linkID in this.links) {
			if (this.links[linkID].targetPort !== null)
				this.links[linkID].targetPort.sampleCallback(data);
		}
	}
}