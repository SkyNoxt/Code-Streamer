
import React from "react";
import ReactDOM from "react-dom";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import "storm-react-diagrams/dist/style.min.css"
import "./Configuration.css"

import { NodeFactory } from "./Node"

import NetworkSocket from "./Nodes/NetworkSocket/NetworkSocket"
import Viewport from "./Nodes/Viewport/Viewport"

class DiagramComponent extends DiagramWidget {

	componentDidMount() {
		this.onKeyUpPointer = this.onKeyUp.bind(this);

		//add a keyboard listener
		this.setState({
			document: document,
			renderedNodes: true,
			diagramEngineListener: this.props.diagramEngine.addListener({
				repaintCanvas: () => {
					this.forceUpdate();
				}
			})
		});

		let DOMNode = ReactDOM.findDOMNode(this);
		DOMNode.tabIndex = 0;
		DOMNode.addEventListener("keyup", this.onKeyUpPointer, false);

		// dont focus the window when in test mode - jsdom fails
		if (process.env.NODE_ENV !== "test") {
			window.focus();
		}
	}
}

export default class Configuration extends React.Component {

	constructor(props) {
		super(props);

		let engine = new DiagramEngine();
		engine.installDefaultFactories();
		engine.registerNodeFactory(new NodeFactory());

		let diagram = new DiagramModel();

		engine.setDiagramModel(diagram);

		let networkSocket = new NetworkSocket();
		let viewport = new Viewport();

		diagram.addAll(networkSocket, viewport);

		this.render = () => <DiagramComponent className="configuration" diagramEngine={engine} />;
	}

	render() {
		return null;
	}
}
