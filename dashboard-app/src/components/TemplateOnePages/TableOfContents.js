import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const InnerObj = (props) => {
    var content = props.content
    var depth = props.depth
    if (!content) {
        return null
    }
    return (
        <div>
            <div>            
                {content.map(innerContent =>
                <div>
                    <div className={"TOCRow + ContentStyle_" + depth}>
                        <div className="TOCColumnLeft"  key={innerContent.Access}>{innerContent.Title}</div>
                        <div className="TOCColumnRight">{depth}</div>
                    </div>
                    <InnerObj content={innerContent.Sub} depth={depth+1}/>
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

    return(<InnerObj content={tocContent} depth={0}/>)
}

export default TableOfContents;