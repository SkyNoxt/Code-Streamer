
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

export class Window extends React.PureComponent {

	constructor(props) {
		super(props);
		this.container = null;
		this.external = null;

		nw.Window.open(this.props.page, this.props.settings, (window) => {
			this.external = window;
			this.external.on("loaded", () => {
				this.container = this.external.window.document.getElementById("container");
				this.props.styles && this.props.styles.forEach((style) =>
					this.external.window.document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"" + style + "\" />"));
				this.render = () => ReactDOM.createPortal(this.props.children, this.container);
				this.props.loaded && this.props.loaded(this);
				this.forceUpdate();
			});
			this.external.on("closed", () => {
				this.props.closed && this.props.closed(this);
			});
		});
	}

	render() {
		return null;
	}

	componentWillUnmount() {
		this.external.window.close();
	}
}
