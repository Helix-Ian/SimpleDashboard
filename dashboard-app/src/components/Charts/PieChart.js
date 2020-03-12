import React, { useEffect } from 'react';

function PieChart(props) {
  //Get data objects and the accessType for this table
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    // Add the given columns from the data, using the first entry as a basis
    for (var key in dataObjects[0]) {
      var columnType = key !== 'Total' ? 'string' : 'number';
      data.addColumn(columnType, key);
    }

    var legendArray = [];
    var legendObject = new Object();

    // Aggregate total count of each category
    const totalCount = dataObjects.reduce((acc, val) => acc + val.Total, 0);

    // Found a function to format number with commas in thousands place
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    dataObjects = dataObjects.map(dataObj => {
      const percentageVal = ((dataObj.Total / totalCount) * 100).toFixed(2);
      const newCategory = `${percentageVal}% ${
        dataObj.Category
      } (${numberWithCommas(dataObj.Total)})`;
      // Return new dataObj
      return {
        ...dataObj,
        Category: newCategory
      };
    });

    for (var dataObject of dataObjects) {
      var row = [];
      for (var key in dataObject) {
        row.push(dataObject[key]);
      }
      data.addRow(row);
    }

    var options = {
      title: 'Exploit Attacks by Severity',
      width: 750,
      slices: {
        0: { color: '#FFE066' },
        1: { color: '#FFA500' },
        2: { color: '#CD5C5C' }
      },
      legend: { position: 'right', alignment: 'center' },
      pieSliceText: 'none',
      tooltip: { isHtml: true, showColorCode: true }
    };

    var chart = new window.google.visualization.PieChart(
      document.getElementById(accessType)
    );
    chart.draw(data, options);
  };

  useEffect(() => {
    // delays loading until charts api is loaded
    if (!window.isGoogleChartsLoaded) {
      window.googleChartsLoadFunctions.push(renderTable);
      return;
    }

    renderTable();
  });

  return <div id={accessType}></div>;
}

export default PieChart;
