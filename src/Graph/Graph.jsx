
import React from "react";

import { DiagramEngine, DiagramModel, DefaultNodeModel } from "storm-react-diagrams";

import Diagram from "./Diagram";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();

        var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255");

        let diagram = new DiagramModel();
        diagram.addAll(node1);
        this.engine.setDiagramModel(diagram);
    }

    componentDidMount() {
        let DOMNode = ReactDOM.findDOMNode(this);
        DOMNode.ownerDocument.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"../node_modules/storm-react-diagrams/dist/style.min.css\" />");
        DOMNode.ownerDocument.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"./Graph/Graph.css\" />");
    }

    render() {
        return (
            <Diagram className="graph" diagramEngine={this.engine} />
        );
    }
}
