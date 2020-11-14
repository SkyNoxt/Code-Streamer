
import { DefaultPortModel } from "storm-react-diagrams";
import Link from "./Link";

export default class Port extends DefaultPortModel {

	constructor(isInput, label, linkCallback, sampleCallback) {
		super(isInput, label);
		this.linkCallback = linkCallback || function () { };
		this.sampleCallback = sampleCallback || function () { };
	}

	createLinkModel() {
		return new Link();
	}

	transmit(data) {
		for (const link in this.links) {
			this.links[link].sourcePort.sampleCallback(data);
			if (this.links[link].targetPort !== null)
			this.links[link].targetPort.sampleCallback(data);
		}
	}
}
