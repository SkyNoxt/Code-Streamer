
import React from "react";
import ReactDOM from "react-dom";

import {
	DiagramEngine,
	DiagramModel,
	DiagramWidget
} from "storm-react-diagrams";

import { NodeFactory, NodeWindow } from "./Node"

import CustomCode from "./Nodes/CustomCode/CustomCode"

import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';

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
				<MenuProvider id="Configuration222" style={{height: "100%"}}>
					<DiagramWidget className="configuration" diagramEngine={this.engine} />
				</MenuProvider>
				{this.contextMenu()}
			</React.Fragment>
		);
	}

	contextMenu() {
		return (
			<Menu id="Configuration222">
				{this.contextOptions()}
			</Menu>
		);
	}

	contextOptions() {
		return (
			<React.Fragment>
				<Item data={{ foo: 'bar' }} >
					ContextMenu Item 7
				</Item>
				<Item data={{ foo: 'bar' }} >
					ContextMenu Item 8
				</Item>
				<Separator />
				<Item data={{ foo: 'bar' }} >
					ContextMenu Item 9
				</Item>
			</React.Fragment>
		);
	}

	componentWillMount() {
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/react-contexify/dist/ReactContexify.min.css\" />");
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
