
import React from "react";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "@projectstorm/react-diagrams";

import Port from "./Port";

export class PluginFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, plugin) {
		return (
			<div onDoubleClick={() => plugin.onDoubleClick()}>
				<DefaultNodeWidget node={plugin} />
			</div>
		);
	}

	getNewInstance() {
		return new Plugin();
	}
}

export default class Plugin extends DefaultNodeModel {

	constructor(name, color, controls) {
		super(name, color);
		if (controls) {
			this.controls = controls;
			this.controls.plugin = this;
		}
	}

	addOutPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(false, label, linkCallback, sampleCallback));
	}

	addInPort(label, linkCallback, sampleCallback) {
		return this.addPort(new Port(true, label, linkCallback, sampleCallback));
	}

	onDoubleClick() { }
}
