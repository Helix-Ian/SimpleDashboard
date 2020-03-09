import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';


/**
 * This function will triage out each of the calls
 * @param type - the type of API that we will be calling
 * 
 * @return json string of the api information needed or "There has been an invalid type passed in" if the type is incorrect
 */
export const processApi = (type) => {
    var apiResponse = ""
    switch (type) {
        case "ToC":
            apiResponse = getTableOfContents();
            break;
        case "SummaryTable":
            apiResponse = getSummaryTable();
            break;
        case "Top20IntrusionsByTypes":
            apiResponse = getChartTable();
            break;
        case "PieChart":
            apiResponse = getPieChart();
            break;
        case "MonitoredSystems":
            apiResponse = getTable();
            break;
        default:
            return "There has been an invalid type passed in"
    }
    return apiResponse;
};


const getTableOfContents = function() {
    //Call API
    return {"ToC": [
    {
        "Title": "Monitored Systems",
        "Access": "MonitoredSystems"
    },
    {
        "Title": "Top 20 Intrusions by Types",
        "Access": "Top20IntrusionsByTypes"
    }
]}
}

const getPieChart = function() {
    //Call API
    return {
        "Access": "ExploitAttackBySeverity",
        "DisplayType": "PieChart",
        "Data": [
            {"Category":"Mediun","Total":1644},
            {"Category":"High","Total":605},
            {"Category":"Critical","Total":245},
        ]
    }
}

const getChartTable = function() {
    //Call API
    return {
        "Access": "Top20IntrusionsByTypes",
        "DisplayType": "ChartTable",
        "Title" : "Top Intrusions by Type",
        "Data": [
            {
                "IntrusionType": "Anomaly",
                "Counts": 1460
            },
            {
                "IntrusionType": "SQL Injection",
                "Counts": 402
            },
            {
                "IntrusionType": "Code Injection",
                "Counts": 212
            },
            {
                "IntrusionType": "OS Command Injection",
                "Counts": 143
            },
            {
                "IntrusionType": "Information Disclosure",
                "Counts": 84
            },
            {
                "IntrusionType": "DoS",
                "Counts": 84
            },
            {
                "IntrusionType": "Permission/Priviledge/Access Control",
                "Counts": 66
            },
            {
                "IntrusionType": "Malware",
                "Counts": 23
            },
            {
                "IntrusionType": "Path Traversal",
                "Counts": 7
            },
            {
                "IntrusionType": "Buffer Errors",
                "Counts": 3
            },
            {
                "IntrusionType": "Other",
                "Counts": 1
            }
        ]
    }
}

const getTable = function() {
    return {
        "Access": "MonitoredSystems",
        "DisplayType": "Table",
        "Data": [
            {
                "Name": "demo-server-1",
                "OS": "Windows Server 2008 R2 Standard",
                "IP": "10.1.1.4",
                "Address": "00-50-56-97-5A-2B"
            },
            {
                "Name": "demo-server-2",
                "OS": "Windows Server 2019 Datacenter",
                "IP": "10.1.2.4",
                "Address": "00-50-56-B0-9C-75"
            },
            {
                "Name": "demo-server-3",
                "OS": "Windows Server 2008 R2 Standard",
                "IP": "10.1.2.26",
                "Address": "00-50-56-B0-06-1A"
            },
            {
                "Name": "demo-server-4",
                "OS": "Windows Server 2008 R2 Standard",
                "IP": "10.1.2.5",
                "Address": "00-50-56-97-0C-C7"
            },
            {
                "Name": "demo-server-5",
                "OS": "Windows Server 2008 R2 Standard",
                "IP": "10.1.1.1",
                "Address": "E4-1F-13-45-89-82"
            },
            {
                "Name": "demo-server-6",
                "OS": "Windows Server 2008 R2 Standard",
                "IP": "10.1.2.3",
                "Address": "00-50-56-B0-3E-D8"
            }
        ]
    }
}

    //This one is a bit more complicated for auto-generating the table, lets save the data massaging for a bit later
const getSummaryTable = function() {
    //Call API
    return {
        "Access": "CriticalRiskApplicationsDetailed",
        "DisplayType": "SummaryTable",
        "Data": [
            {
                "Application": "JonDo",
                "Data": [
                    {
                        "User (or IP)": "192.168.4.14",
                        "Session": 9224
                    }
                ]
            },
            {
                "Application": "Proxy.HTTP",
                "Data": [
                    {
                        "User (or IP)": "192.168.5.1",
                        "Session": 26
                    },
                    {
                        "User (or IP)": "192.168.5.2",
                        "Session": 9
                    },
                    {
                        "User (or IP)": "192.168.5.3",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "192.168.5.4",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "192.168.5.5",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "192.168.5.6",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "192.168.5.7",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "192.168.5.8",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "192.168.5.9",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "192.168.5.10",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "Others",
                        "Session": 203
                    }
                ]
            },
            {
                "Application": "SOCKS5",
                "Data": [
                    {
                        "User (or IP)": "5.188.210.101",
                        "Session": 40
                    }
                ]
            },
            {
                "Application": "SOCK4",
                "Data": [
                    {
                        "User (or IP)": "5.188.210.101",
                        "Session": 34
                    }
                ]
            },
            {
                "Application": "Ultrasurf_9.6+",
                "Data": [
                    {
                        "User (or IP)": "107.6.169.250",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "107.6.171.130",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "108.178.61.58",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "208.93.152.17",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "208.93.153.177",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "96.126.103.73",
                        "Session": 2
                    },
                    {
                        "User (or IP)": "107.6.183.162",
                        "Session": 1
                    },
                    {
                        "User (or IP)": "198.20.103.242",
                        "Session": 1
                    }
                ]
            }
        ]
    }
}
