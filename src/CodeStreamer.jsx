
import React from "react";
import ReactDOM from "react-dom";

export class CodeStreamer extends React.Component {

	render() {
		return (
			<div>Hello World!</div>
		);
	}
}

export class Window {
	constructor(page, settings, component, titleBar) {
		nw.Window.open(page, settings, (window) => {
			this.window = window;
			this.window.on("loaded", () => {
				titleBar ? ReactDOM.render(React.createElement(titleBar, { window: this }), this.window.window.document.getElementById("titleBar")) :
					ReactDOM.render(<CodeStreamerTitleBar window={this} />, this.window.window.document.getElementById("titleBar"));
				ReactDOM.render(React.createElement(component, { window: this }), this.window.window.document.getElementById("component"));
			});
		});
	}

	minimize() {
		this.window.minimize();
	}

	fullscreen() {
		this.window.toggleFullscreen();
	}

	close() {
		this.window.close();
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
