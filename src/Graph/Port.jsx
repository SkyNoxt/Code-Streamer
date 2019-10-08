
import { DefaultPortModel } from "@projectstorm/react-diagrams";
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
		for (const link of this.links) {
			link.sourcePort.sampleCallback(data);
			if (link.targetPort !== null)
				link.targetPort.sampleCallback(data);
		}
	}
}
