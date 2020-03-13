import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const Footer = props => {
  var pageNumber = props.pageJson.pageNumber;
  var totalPageNumber = props.pageJson.totalPageNumber;

  return (
    <div>
      page {pageNumber} of {totalPageNumber}
    </div>
  );
};

export default Footer;
