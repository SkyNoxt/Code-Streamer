
import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export default class Link extends DefaultLinkModel {

	setTargetPort(port) {
		super.setTargetPort(port);
		if (port == null) return;

		for (const link in port.links) {
			if (link !== this.id && (port.links[link].sourcePort === this.sourcePort || port.links[link].targetPort === this.sourcePort))
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
