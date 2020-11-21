
import React from "react";
import ReactDOM from "react-dom";

import Graph from "./Graph/Graph";
import { Window, TitleBar, StatusBar } from "./Graph/Node";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<Window page={"src/CodeStreamer.html"} settings={{ width: 1280, height: 720, frame: false, icon: "img/code-streamer.png" }}
				styles={["../node_modules/storm-react-diagrams/dist/style.min.css", "file://" + __dirname + "/Graph/Graph.css"]}>
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
