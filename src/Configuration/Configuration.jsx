
import React from "react";
import ReactDOM from "react-dom";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import { NodeFactory } from "./Node"

import NetworkSocket from "./Nodes/NetworkSocket/NetworkSocket"
import Viewport from "./Nodes/Viewport/Viewport"

/*class Diagram extends DiagramWidget {

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
}*/

export default class Configuration extends React.Component {

	constructor(props) {
		super(props);

		this.engine = new DiagramEngine();
		this.engine.installDefaultFactories();
		this.engine.registerNodeFactory(new NodeFactory());

		let diagram = new DiagramModel();

		this.engine.setDiagramModel(diagram);

		let networkSocket = new NetworkSocket();
		let viewport = new Viewport();

		diagram.addAll(networkSocket, viewport);

		this.render = () => <DiagramWidget className="configuration" diagramEngine={this.engine} />;
	}

	componentWillMount() {
		document.head.insertAdjacentHTML("beforeend","<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
		document.head.insertAdjacentHTML("beforeend","<link rel=\"stylesheet\" href=\"../src/Configuration/Configuration.css\" />");
	}

	/*componentDidMount() {
		let node = document.createElement("div");
		this.engine.canvas.appendChild(node);
		this.engine.contextWrapper = node;
	}*/

	render() {
		return null;
	}
}
