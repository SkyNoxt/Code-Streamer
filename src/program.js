
require("@babel/register");

const React = require("react");
const ReactDOM = require("react-dom");

const App = require("src/CodeStreamer.jsx");

let component = document.createElement('div');
window.document.body.appendChild(component);

ReactDOM.render(React.createElement(App.CodeStreamer, {}), component);
