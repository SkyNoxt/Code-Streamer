
import fs from "fs";
import React from "react";

import { DiagramEngine, DiagramModel } from "storm-react-diagrams";

import Diagram from "./Diagram";
import { PluginFactory } from "./Plugin";

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.models = [];

        /*fs.readdir("node_modules/@code-streamer", (error, modulePaths) => {
            for (const modulePath of modulePaths)
                import("node_modules/@code-streamer/" + modulePath).then(exported => {
                    for (const module of exported.default) {
                        module.graph = this;
                        this.models.push(module);
                    }
                    this.forceUpdate();
                });
        });*/

        fs.readdir(__dirname + "/Plugins", (error, modulePaths) => {
            for (const modulePath of modulePaths)
                import(__dirname + "/Plugins/" + modulePath).then(exported => {
                    for (const module of exported.default) {
                        module.class.graph = this;
                        this.models.push(module);
                    }
                    this.forceUpdate();
                });
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

                    var node = new this.models[model].class();
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
                <Tray models={this.models} />
                <Diagram className="diagram" diagramEngine={this.engine} />
            </div>
        );
    }
}

class Tray extends React.Component {
    render() {
        return (
            <div className="tray">
                {this.props.models.map((model, index) => {
                    return <TrayItem key={index} name={model.name} color={model.color} model={index} />
                })}
            </div>
        );
    }
}

class TrayItem extends React.Component {
    render() {
        return (
            <div className="srd-default-node " style={{ background: this.props.color }} draggable={true}
                onDragStart={event => {
                    event.dataTransfer.setData("model", this.props.model);
                }}>
                <div className="srd-default-node__title ">
                    <div className="srd-default-node__name ">
                        {this.props.name}
                    </div>
                </div>
            </div>
        );
    }
}
