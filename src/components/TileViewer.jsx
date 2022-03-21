import React, {useEffect, useState} from "react";

import {action} from './Util';

import "./TileViewer.css"

function TileViewer(props) {

    const [imgsrc, setImgSrc] = useState(null);


    useEffect(()=>{
        setImgSrc(props.imgSrc);
    })

    return (<>
    <div className="tile-viewer">
        {props.tileType === "Grid" &&
            <div className={"tile-V"}>
                {[...Array(props.tileCount)].map((val,id) => (
                    <div className={"tile-H"} id={id}>
                    {[...Array(props.tileCount)].map((val,id) => (<img key={id} src={imgsrc} width={100+ props.size*10} className="thumbnail" />))}
                    </div>
                ))}
            </div>
        }
        {props.tileType === "Vertical" && <div className={"tile-V"}>
        {[...Array(props.tileCount)].map((val,id) => (<img key={id} src={imgsrc} width={100+ props.size*10} className="thumbnail" />))}
        </div>}
        {props.tileType === "Horizontal" && <div className={"tile-H"}>
        {[...Array(props.tileCount)].map((val,id) => (<img key={id} src={imgsrc} width={100+ props.size*10} className="thumbnail" />))}
        </div>
        }
    </div>
    </>);
}

export default TileViewer;