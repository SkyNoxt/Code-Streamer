
import React from "react";
import ReactDOM from "react-dom";

import Graph from "./Graph/Graph";
import { Window } from "./Graph/Plugin";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<Window page={"src/CodeStreamer.html"} settings={{ width: 1280, height: 720, frame: false, icon: "img/code-streamer.png" }}
				styles={["../node_modules/@projectstorm/react-diagrams/dist/style.min.css", "file://" + __dirname + "/Graph/Graph.css"]}>
				<CodeStreamerTitleBar />
				<Graph />
				<StatusBar />
			</Window>
		);
	}
}

class CodeStreamerTitleBar extends React.Component {

	render() {
		return (
			<TitleBar title="Code Streamer">
				<button>?</button>
			</TitleBar>
		);
	}
}

class TitleBar extends React.Component {

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

class StatusBar extends React.Component {

	render() {
		return (
			<div id="statusBar">
				{this.props.status}
			</div>
		);
	}
}
