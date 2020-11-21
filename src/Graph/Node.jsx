
import React from "react";

import { DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget } from "storm-react-diagrams";

import Port from "./Port";

export class NodeFactory extends DefaultNodeFactory {

	generateReactWidget(diagramEngine, node) {
		return (
			<div onDoubleClick={() => node.onDoubleClick()}>
				<DefaultNodeWidget node={node} />
			</div>
		);
	}

	getNewInstance() {
		return new Node();
	}
}

export default class Node extends DefaultNodeModel {

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
				if (this.props.styles)
					for (const style of this.props.styles)
						this.external.window.document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"" + style + "\" />");
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

export class TitleBar extends React.Component {

	componentDidMount() {
		this.setState({ window: nw.Window.get(ReactDOM.findDOMNode(this).ownerDocument.defaultView) });
	}

	render() {
		return (
			<div id="titleBar">
				<div id="titleBarTitle">{this.props.title}</div>
				<div id="titleBarButtons">
					{this.props.children}
					<button onClick={() => this.state.window.minimize()}>-</button>
					<button onClick={() => this.state.window.toggleFullscreen()}>+</button>
					<button onClick={() => this.state.window.close()}>x</button>
				</div>
			</div>
		);
	}
}

export class StatusBar extends React.Component {

	render() {
		return (
			<div id="statusBar">
				{this.props.status}
			</div>
		);
	}
}
