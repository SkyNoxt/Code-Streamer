
import React from "react";

import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";

import Diagram from "./Diagram";
import { PluginFactory } from "./Plugin";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.models = [];

        import("./Plugins/NetworkSocket").then(mod => {
            for (const modul of mod.default)
                this.models.push(modul);
        });

        this.engine = new DiagramEngine();
        this.engine.installDefaultFactories();
        this.engine.registerNodeFactory(new PluginFactory());

        this.engine.setDiagramModel(new DiagramModel());
    }

    render() {
        return (
            <div className="graph"
                onDrop={event => {
                    var model = event.dataTransfer.getData("model");
                    if (!model) return;

                    var node = new this.models[model]();
                    var points = this.engine.getRelativeMousePoint(event);
                    node.x = points.x;
                    node.y = points.y;
                    this.engine.getDiagramModel().addNode(node);
                    this.forceUpdate();
                }}
                onDragOver={event => {
                    event.preventDefault();
                }}
            >
                <Tray className="tray">
                    <TrayItem name="Component 1" model={0} />
                </Tray>
                <Diagram className="diagram" diagramEngine={this.engine} />
            </div>
        );
    }
}

class Tray extends React.Component {
    render() {
        return (
            <div {...this.props}>
                <TrayItem name="Component 0" model={0} />
                <TrayItem name="Component 0" model={0} />
                <TrayItem name="Component 0" model={0} />
                <TrayItem name="Component 0" model={0} />
            </div>
        );
    }
}

class TrayItem extends React.Component {
    render() {
        return (
            <div
                draggable={true}
                onDragStart={event => {
                    event.dataTransfer.setData("model", this.props.model);
                }}
            >
                {this.props.name}
            </div>
        );
    }
}
