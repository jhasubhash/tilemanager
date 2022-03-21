
import React , { useState, useEffect, useRef } from "react";
import "./TileManagerPanel.css"
import TileViewer from "./TileViewer";
import {saveCurrentDocAsPng, action, app} from './Util';

function TileManagerPanel() {
    const [sourceImage, setSourceImage] = useState(null);
    const [tileCount, setTileCount] = useState(3);
    const [tileType, setTileType] = useState("Horizontal");
    const [size, setsize] = useState(0);
    const sliderRef = useRef(null);

    let createPng = () => {
        if(!app.activeDocument) return;
        let fileName = 'test.png';
        saveCurrentDocAsPng(fileName).then((obj) => {
            console.log(obj);
            //setSourceImage(obj[0].in._path);
            setSourceImage("plugin-data://PluginData//"+fileName+"?"+Date.now());
        });
    }

    useEffect(() => {
        createPng();
    },[])


    let listener = (e,d) => { 
        if((e === "save" && d.saveStage._value === "saveSucceeded")||
        (e === "select" && d._target[0]._ref === 'document')||
        (e === "open") ||
        (e === "make" && d.new && d.new._obj ==="document")){
           console.log("doc saved triggered");
           createPng();
        }
    }

    useEffect(()=>{
        action.addNotificationListener([
            {
                event: "save"
            },
            {
                event: "select"
            },
            {
                event: "open"
            },
            {
                event: "make"
            }
        ], listener);
        document.querySelector(".tileCount").addEventListener("change", evt => {
            setTileCount(evt.target.selectedIndex+1);
        })
        document.querySelector(".tilePicker").addEventListener("change", evt => {
            setTileType(evt.target.value);
        })
        sliderRef.current.addEventListener("input", evt => {
            setsize(evt.target.value);
        })
        return ()=>{
            action.removeNotificationListener([
                {
                    event: "save"
                }
            ], listener);
        }
    },[])

    return (
    <div style={{display:'flex', flexDirection:'column'}}>
        <div className="picker-container">
        <sp-body size="S">Tiling Type:</sp-body>
        <sp-picker value={"tileType"} label="Tiling Type" class="tilePicker" id="tiling-type">
            <sp-menu slot="options">
                <sp-menu-item selected value="Horizontal">Horizontal</sp-menu-item>
                <sp-menu-item value="Vertical">Vertical</sp-menu-item>
                <sp-menu-item value="Grid">Grid</sp-menu-item>
            </sp-menu>
        </sp-picker>
        </div>
        <div className="picker-container">
        <sp-body size="S">Tile Count:</sp-body>
        <sp-picker label="Tile Count" class="tileCount">
            <sp-menu slot="options">
                <sp-menu-item> 1 </sp-menu-item>
                <sp-menu-item> 2</sp-menu-item>
                <sp-menu-item selected> 3</sp-menu-item>
                <sp-menu-item> 4</sp-menu-item>
            </sp-menu>
        </sp-picker>
        </div>
        <div className="size-slider">
        <sp-slider ref={sliderRef} show-value="false" data-part="size" value={size} min={-10} max={10} width={'80%'}>
            <sp-label slot="label">Tile Size</sp-label>
        </sp-slider>
        </div>
        <div style={{paddingTop:'1em', paddingBottom:'1em'}}><sp-divider/></div>
        <div className="tile-viewer-container">
            <TileViewer imgSrc={sourceImage} tileCount={tileCount} tileType={tileType} size={size}/>
        </div>
    </div>
    );
}


export default TileManagerPanel;