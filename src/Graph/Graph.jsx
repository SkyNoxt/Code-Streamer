
import React from "react";

import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";

import Diagram from "./Diagram";
import { PluginFactory } from "./Plugin";

import NetworkSocket from "./Plugins/NetworkSocket/NetworkSocket";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();
        this.engine.registerNodeFactory(new PluginFactory());

        let model = new DiagramModel();

        var socket0 = new NetworkSocket();
        var socket1 = new NetworkSocket();

        model.addAll(socket0, socket1);

        this.engine.setDiagramModel(model);
    }

    render() {
        return (
            <Diagram className="graph" diagramEngine={this.engine} />
        );
    }
}
