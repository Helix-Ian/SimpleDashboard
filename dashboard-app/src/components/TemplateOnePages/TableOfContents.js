import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const InnerObj = (props) => {
    var content = props.content
    var depth = props.depth
    const reportNumber = props.reportNumber

    if (!content) {
        return null
    }
    return (
        <div>
            <div>            
                {content.map(innerContent =>
                <div>
                    <div className={"TOCRow + ContentStyle_" + depth}>
                        <div className="TOCColumnLeft"  key={innerContent.Access} reportNumber={reportNumber} onClick={e => {props.onClick(e, reportNumber)}}>{innerContent.Title}</div>
                        <div className="TOCColumnRight">{depth}</div>
                    </div>
                    <InnerObj content={innerContent.Sub} reportNumber ={reportNumber} onClick={e => {props.onClick(e, reportNumber)}} depth={depth+1}/>
                </div>
                )}
            </div>
        </div>
    )
}

const TableOfContents = (props) => {
    var json = {"ToC" : [
        {"Title": "Executive Summary","Access": "ExecutiveSummary"},{"Title": "Key Observations","Access": "KeyObservations"},
    {
        "Title": "Monitored Systems",
        "Access": "MonitoredSystems",
        "Sub": [
            {
                "Title": "Security and Threat Prevention",
                "Access": "SecurityandThreatPrevention",
                "Sub": [
                    {
                        "Title": "High Risk Application Summary1",
                        "Access": "HighRiskApplicationSummary"
                    },
                    {
                        "Title": "High Risk Application Summary1",
                        "Access": "HighRiskApplicationSummary"
                    }
                ]
            },
            {
                "Title": "High Risk Applications",
                "Access": "HighRiskApplications",
                "Sub": [
                    {
                        "Title": "High Risk Application Summary",
                        "Access": "HighRiskApplicationSummary"
                    },
                    {
                        "Title": "High Risk Application Summary",
                        "Access": "HighRiskApplicationSummary"
                    }
                ]
            }
        ]
    }
]
    }
    var tocContent = json.ToC
    
    //generate random report seed
    function getRandomReport() {
        return Math.floor(Math.random() * 3)
    }
    const randomInt = getRandomReport()
    const counter = 0

    return(<InnerObj content={tocContent} reportNumber={randomInt} onClick={props.onClick} depth={0} counter={counter}/>)
}

export default TableOfContents;