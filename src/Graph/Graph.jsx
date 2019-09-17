
import React from "react";

import {
    DiagramEngine, DiagramModel, DiagramWidget, DefaultLinkModel,
    DefaultNodeModel
} from "storm-react-diagrams";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();

        var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255");

        let diagram = new DiagramModel();
        diagram.addAll(node1);
        this.engine.setDiagramModel(diagram);

        this.props.window.window.document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
        this.props.window.window.document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"./Graph/Graph.css\" />");
    }

    render() {
        return (
            <Diagram window={this.props.window} className="graph" diagramEngine={this.engine} />
        );
    }
}

class Diagram extends DiagramWidget {

    componentDidMount() {
        this.onKeyUpPointer = this.onKeyUp.bind(this);

        //add a keyboard listener
        this.setState({
            document: this.props.window.window.document,
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
}
