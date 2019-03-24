
import React from "react";
import ReactDOM from "react-dom";

import { Item } from 'react-contexify';

import Node, { NodeWindow } from "../../Node"

import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";

export default class CustomCode extends Node {

	constructor() {
		super("Custom Code", "#ffffffff", new CustomCodeControls());
	}

	contextOptions() {
		return (
			<React.Fragment>
				<Item onClick={() => this.controls.show()} >
					Open Code Editor
				</Item>
			</React.Fragment>
		);
	}
}

export class CustomCodeControls extends NodeWindow {

	constructor(props) {
		super(props);

		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/codemirror/lib/codemirror.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/codemirror/theme/shadowfox.css\" />");
		document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"" + __dirname + "/CustomCode.css\" />");
	}

	componentWillMount() {

	}

	componentDidMount() {
		this.setState({
			codeMirror: CodeMirror(ReactDOM.findDOMNode(this), {
				lineNumbers: true,
				lineWrapping: true,
				theme: "shadowfox",
				mode: "javascript"
			})
		}, () => {
			this.state.codeMirror.refresh();
			this.state.codeMirror.on("change", (codeMirror) => new Function(codeMirror.doc.getValue()).call(this));
		});
	}

	render() {
		return <div id="CustomCode" />;
	}
}
