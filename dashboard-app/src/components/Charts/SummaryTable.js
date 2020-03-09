import React, { useEffect } from 'react';


/*
    Expects an array of objects, each with an entry determining the base column, and a Data array
    The array is a list of objects, each with entries for descriptors of the data, and the data entry itself
    Currently, the data entry is determined by which column is named "Session"

    Example of expected data:
    [
        {
            "HeaderColumn": "EntryName",
            "Data": [
                {
                    "ColumnName": "DataEntry",
                    "Session": 1234
                },
                [...]
            ]
        },
        [...]
    ]
*/
const SummaryTable = (props) => {

    var dataObjects = props.info.Data;
    var accessType = props.info.Access;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        // name of the column that names each entry
        var baseColumnName = "";

        // the column(s) that describe each row
        var titleCols = [];

        // the name of the column with numerical data
        var dataColName = "Session";

        // the indices of the columns to bold with every (sub)total row
        var columnsToBold = [];

        // find the name of the column by finding the non-Data key in the first entry
        for (var key in dataObjects[0]) {
            if (key != 'Data') {
                baseColumnName = key;
                break;
            }
        }
        data.addColumn('string', baseColumnName);

        // add the columns from the individual data entries
        for (var key in dataObjects[0].Data[0]) {
            var isTitleCol = key !== dataColName;
            var rowIndex = data.addColumn(isTitleCol ? 'string' : 'number');
            columnsToBold.push(rowIndex);
            if (isTitleCol) {
                titleCols.push(key);
            }
        }
        columnsToBold.push(data.addColumn('number', '% of Subtotal'));

        // helper function to populate a row array with correct data
        function getRowData(dataObj, rowIndex, percentages) {
            var row = [(rowIndex == 0 ? dataObj[baseColumnName] : '')];
            for (var colName of titleCols) {
                row.push(dataObj.Data[rowIndex][colName]);
            }
            row.push(dataObj.Data[rowIndex][dataColName]);
            row.push(percentages[rowIndex]);
            return row;
        }
        
        var total = 0;
        // add each of the data entries
        for (var dataObject of dataObjects) {
            var objectData = dataObject.Data;
            var objectValues = objectData.map((cur) => cur[dataColName]);

            // create percentages to populate the last column with
            var subtotal = objectValues.reduce((prev, cur) => prev + cur);
            var percentages = objectValues.map((cur) => (cur / subtotal) * 100);
            total += subtotal;

            for (var i = 0; i < objectData.length; i++) {
                data.addRow(getRowData(dataObject, i, percentages));
            }
            
            // create + bold the subtotal row
            var boldIndex = data.addRow(['', 'Subtotal', subtotal, 100]);
            for (var colIndex of columnsToBold) {
                data.setProperty(boldIndex, colIndex, 'style', 'font-weight: bold;');
            }
        }
        // create + bold the total row
        var finalRow = data.addRow(['', 'Total', total, 100]);
        for (var colIndex of columnsToBold) {
            data.setProperty(finalRow, colIndex, 'style', 'font-weight: bold;');
        }

        var percentFormat = new window.google.visualization.NumberFormat({suffix: '%'});
        percentFormat.format(data, 3);

        var options = {
            sort: 'disable',
            allowHtml: true
        };

        var table = new window.google.visualization.Table(document.getElementById(accessType));
        table.draw(data, options);
    }
    
    useEffect(() => {
        // delays loading until charts api is loaded
        if (!window.isGoogleChartsLoaded) {
            window.googleChartsLoadFunctions.push(renderTable);
            return;
        }

        renderTable();
    })

    return (
        <div id={accessType}></div>
    );
}

export default SummaryTable;