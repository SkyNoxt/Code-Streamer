
require("@babel/register");

const React = require("react");
const ReactDOM = require("react-dom");

const App = require("./src/CodeStreamer.jsx");

let container = document.createElement('div');
window.document.body.appendChild(container);

ReactDOM.render(React.createElement(App.CodeStreamer, {}), container);
