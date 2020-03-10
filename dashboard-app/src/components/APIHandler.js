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
        case "CriticalRiskApplicationsDetailed":
            apiResponse = getSummaryTable();
            break;
        case "Top20IntrusionsByTypes":
            apiResponse = getChartTable();
            break;
        case "ExploitAttackBySeverity":
            apiResponse = getPieChart();
            break;
        case "":
            apiResponse = getLineGraph();
            break;
        case "MonitoredSystems":
            apiResponse = getTable();
            break;
        case "AreaChart":
            apiResponse = getAreaChart();
            break;
        case "DonutChartAccess":
            apiResponse = getDonutChart();
            break;
        case "BarChartAccess":
            apiResponse = getBarChart();
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
                    },
                    {
                        "Title": "Exploit Attack By Severity",
                        "Access": "ExploitAttackBySeverity",
                    },
                    {
                        "Title": "Area Chart",
                        "Access": "AreaChart"
                    },
                    {
                        "Title": "Critical Risk Applications Detailed",
                        "Access": "CriticalRiskApplicationsDetailed"
                    },
                    {
                        "Title": "Donut Chart",
                        "Access": "DonutChartAccess"
                    },
                    {
                        "Title": "Bar Chart",
                        "Access": "BarChartAccess"
                    }
                    ]
                }
}

const getAreaChart = function() {
    return {
        "Access": "AreaChart",
        "DisplayType": "AreaChart",
        "Data": [
        ]
    }
}

const getDonutChart = function() {
    return {
        "Access": "DonutChartAccess",
        "DisplayType": "DonutChart",
        "Data": [
        ]
    }
}

const getBarChart = function() {
    return {
        "Access": "BarChartAccess",
        "DisplayType": "BarChart",
        "Data": [
        ]
    }
}

const getPieChart = function() {
    //Call API
    return {
        "Access": "ExploitAttackBySeverity",
        "DisplayType": "PieChart",
        "Data": [
            {"Category":"Medium","Total":1644},
            {"Category":"High","Total":605},
            {"Category":"Critical","Total":245},
        ]
    }
}

const getLineGraph = function() {
    return {
        "Access": "ExploitAttackTimeline",
	    "DisplayType": "LineChart", 
	    "Data": [
            {
                "Time": "2020-01-26T00:00:00.0+06:00Z",
                "Medium": 2,
                "High": 23,
                "Critical": 0
            },
            {
                "Time": "2020-01-26T12:00:00.0+06:00Z",
                "Medium": 132,
                "High": 2,
                "Critical": 1
            },
            {
                "Time": "2020-01-26T00:00:00.0+06:00Z",
                "Medium": 5,
                "High": 3,
                "Critical": 0
            },
            {
                "Time": "2020-01-26T12:00:00.0+06:00Z",
                "Medium": 181,
                "High": 11,
                "Critical": 3
            },
            {
                "Time": "2020-01-26T00:00:00.0+06:00Z",
                "Medium": 8,
                "High": 4,
                "Critical": 1
            },
            {
                "Time": "2020-01-26T12:00:00.0+06:00Z",
                "Medium": 23,
                "High": 2,
                "Critical": 1
            },
            {
                "Time": "2020-01-26T00:00:00.0+06:00Z",
                "Medium": 11,
                "High": 5,
                "Critical": 0
            },
            {
                "Time": "2020-01-26T12:00:00.0+06:00Z",
                "Medium": 668,
                "High": 19,
                "Critical": 0
            },
            {
                "Time": "2020-01-26T00:00:00.0+06:00Z",
                "Medium": 87,
                "High": 21,
                "Critical": 1
            }
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
