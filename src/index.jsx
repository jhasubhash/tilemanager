import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import About from "./components/About.jsx";
import { TileManager } from "./panels/TileManager.jsx";

import { entrypoints } from "uxp";

const aboutController = new CommandController(({ dialog }) => <About dialog={dialog}/>, { id: "showAbout", title: "About Tile Manager", size: { width: 480, height: 480 } });

const tileManagerController =  new PanelController(() => <TileManager/>, { id: "tileManager", menuItems: [
    { id: "reload2", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() },
    { id: "dialog1", label: "About this Plugin", enabled: true, checked: false, oninvoke: () => aboutController.run() },
] });

entrypoints.setup({
    plugin: {
        create(plugin) {
            /* optional */
        },
        destroy() {
            /* optional */
        }
    },
    panels: {
        tileManager: tileManagerController
    }
});
