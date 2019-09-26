
import React from "react";

import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";

import Diagram from "./Diagram";
import { PluginFactory } from "./Plugin";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        import("./Plugins/NetworkSocket").then(mod => {
            for (var i in mod.default)
                model.addAll(new mod.default[i]());

            this.forceUpdate();
        });

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();
        this.engine.registerNodeFactory(new PluginFactory());

        let model = new DiagramModel();

        this.engine.setDiagramModel(model);
    }

    render() {
        return (
            <Diagram className="graph" diagramEngine={this.engine} />
        );
    }
}
