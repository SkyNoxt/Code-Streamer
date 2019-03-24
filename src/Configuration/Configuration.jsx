
import React from "react";

import { DiagramEngine, DiagramModel, DiagramWidget } from "storm-react-diagrams";

import { Menu, Item, Separator, MenuProvider } from 'react-contexify';

import { NodeFactory, NodeWindow } from "./Node"
import CustomCode from "./Nodes/CustomCode/CustomCode"

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
				<MenuProvider id="Configuration">
					<DiagramWidget className="configuration" diagramEngine={this.engine} />
				</MenuProvider>
				{this.contextMenu()}
			</React.Fragment>
		);
	}

	contextMenu() {
		return (
			<Menu id="Configuration" animation="fade">
				<Item data={{ foo: 'bar' }} >
					ContextMenu Item 7
				</Item>
				<Separator />
				<Item data={{ foo: 'bar' }} >
					ContextMenu Item 9
				</Item>
			</Menu>
		);
	}

	componentWillMount() {
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/react-contexify/dist/ReactContexify.min.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"./Configuration/Configuration.css\" />");
	}

	render() {
		return null;
	}
}
