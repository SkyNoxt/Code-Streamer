
import React from "react";

import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";

import Diagram from "./Diagram";
import { PluginFactory } from "./Plugin";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        import("./Plugins/NetworkSocket").then(mod => {
            for (const modul of mod.default)
                model.addAll(new modul());

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
