
import React from "react";

import { DiagramEngine, DiagramModel, DiagramWidget } from "storm-react-diagrams";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();

        let diagram = new DiagramModel();
        this.engine.setDiagramModel(diagram);

        this.style = this.props.window.window.document.head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"./Graph/Graph.css\" />");
    }

    render() {
        return (
            <DiagramWidget className="graph" diagramEngine={this.engine} />
        );
    }
}