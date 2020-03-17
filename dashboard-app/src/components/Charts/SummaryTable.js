import React, { useEffect } from 'react';
import ChartTitle from '../TemplateOnePages/ChartTitle';

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
    var labels = props.info.Labels;
    var title = props.info.Title;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        // the indices of the columns to bold with every (sub)total row
        var columnsToBold = [1, 2, 3];

        data.addColumn('string', labels[0].label);
        data.addColumn('string', labels[1].label);
        data.addColumn('number', labels[2].label);
        data.addColumn('number', labels[3].label);

        // helper function to populate a row array with correct data
        function getRowData(dataObj, rowIndex, percentages) {
            var row = [(rowIndex === 0 ? dataObj.cat : '')];
            row.push(dataObj.data[rowIndex].col2);
            row.push(parseInt(dataObj.data[rowIndex].col3));
            row.push(parseFloat(dataObj.data[rowIndex].col4));
            return row;
        }
        
        var total = 0;
        // add each of the data entries
        for (var dataObject of dataObjects) {
            var objectData = dataObject.data;
            var objectValues = objectData.map((cur) => parseInt(cur.col3));

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
        <div>
            <ChartTitle title={title} />
            <div className='ChartDiv' id={accessType}></div>
        </div>
    );
}

export default SummaryTable;