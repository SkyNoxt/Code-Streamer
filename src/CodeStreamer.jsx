
import React from "react";
import ReactDOM from "react-dom";

import Graph from "./Graph/Graph";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<Window page={"src/CodeStreamer.html"} settings={{ width: 1280, height: 720, frame: false, icon: "img/code-streamer.png" }}>
				<CodeStreamerTitleBar />
				<Graph />
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
				this.render = () => ReactDOM.createPortal(this.props.children, this.container);
				this.forceUpdate();
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
			<React.Fragment>
				<div id="titleBarTitle">{this.props.title}</div>
				<div id="titleBarButtons">
					{this.props.children}
					<button onClick={() => this.state.window.minimize()}>-</button>
					<button onClick={() => this.state.window.toggleFullscreen()}>+</button>
					<button onClick={() => this.state.window.close()}>x</button>
				</div>
			</React.Fragment>
		);
	}
}
