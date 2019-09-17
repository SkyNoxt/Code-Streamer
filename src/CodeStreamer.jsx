
import React from "react";
import ReactDOM from "react-dom";

import Graph from "./Graph/Graph";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<Window page={"src/CodeStreamer.html"} settings={{ width: 1280, height: 720, frame: true, icon: "img/code-streamer.png" }}>
				<Graph class="graph" />
			</Window>
		);
	}
}

class Window extends React.PureComponent {

	constructor(props) {
		super(props);
		this.container = null;
		this.external = null;

		nw.Window.open(this.props.page, this.props.settings, (window) => {
			this.external = window;
			this.external.on("loaded", () => {
				this.container = this.external.window.document.getElementById("component");
				this.render = () => ReactDOM.createPortal(React.cloneElement(this.props.children, { window: this.external }), this.container);
				this.forceUpdate();
			});
		});
	}

	render() {
		return null;;
	}

	componentWillUnmount() {
		this.external.window.close();
	}
}

class CodeStreamerTitleBar extends React.Component {

	render() {
		return (
			<TitleBar window={this.props.window} title="Code Streamer">
				<button>?</button>
			</TitleBar>
		);
	}
}

class TitleBar extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div id="titleBarTitle">{this.props.title}</div>
				<div id="titleBarButtons">
					{this.props.children}
					<button onClick={() => this.props.window.minimize()}>-</button>
					<button onClick={() => this.props.window.fullscreen()}>+</button>
					<button onClick={() => this.props.window.close()}>x</button>
				</div>
			</React.Fragment>
		);
	}
}
