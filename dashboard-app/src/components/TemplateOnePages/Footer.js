import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const Footer = props => {
  var pageNumber = props.pageJson.pageNumber;
  var totalPageNumber = props.pageJson.totalPageNumber;

  return (
    <div className="TestFooter">
    <hr className="hrFooter"></hr>
      page {pageNumber} of {totalPageNumber}
    </div>
  );
};

export default Footer;
