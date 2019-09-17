
import React from "react";
import ReactDOM from "react-dom";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<Window page={"src/index.html"} settings={{ width: 1280, height: 720, frame: true, icon: "img/code-streamer.png" }}>
				Hello World!
			</Window>
		);
	}
}

class Window extends React.PureComponent {

	constructor(props) {
		super(props);
		this.container = document.createElement("div");
		this.external = null;
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.container);
	}

	componentDidMount() {
		nw.Window.open(this.props.page, this.props.settings, (window) => {
			this.external = window;
			this.external.on("loaded", () => {
				this.external.window.document.body.appendChild(this.container);
			});
		});
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
