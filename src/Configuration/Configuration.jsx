
import React from "react";
import ReactDOM from "react-dom";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import { NodeFactory, NodeWindow } from "./Node"

import CustomCode from "./Nodes/CustomCode/CustomCode"

import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";

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

export default class Configuration extends NodeWindow {

	constructor(props) {
		super(props);

		this.engine = new DiagramEngine();
		this.engine.installDefaultFactories();
		this.engine.registerNodeFactory(new NodeFactory());

		let diagram = new DiagramModel();

		this.engine.setDiagramModel(diagram);

		let customCode = new CustomCode();

		diagram.addAll(customCode);

		this.render = () => (
			<React.Fragment>
				<ContextMenuTrigger holdToDisplay={-1} id="Configuration222" style={{height: "100%"}}>
					<DiagramWidget className="configuration" diagramEngine={this.engine} />
				</ContextMenuTrigger>
				{this.contextMenu()}
			</React.Fragment>
		);
	}

	contextMenu() {
		return (
			<ContextMenu id="Configuration222">
				{this.contextOptions()}
			</ContextMenu>
		);
	}

	contextOptions() {
		return (
			<React.Fragment>
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 7
				</MenuItem>
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 8
				</MenuItem>
				<MenuItem divider />
				<MenuItem data={{ foo: 'bar' }} >
					ContextMenu Item 9
				</MenuItem>
			</React.Fragment>
		);
	}

	componentWillMount() {
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"./Configuration/Configuration.css\" />");
	}

	componentDidMount() {
		let node = document.createElement("div");
		this.engine.canvas.appendChild(node);
		this.engine.contextWrapper = node;
	}

	render() {
		return null;
	}
}
