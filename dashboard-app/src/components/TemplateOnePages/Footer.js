import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const Footer = props => {
    var pageNumber = props.pageNumber
    var totalPageNumber = props.totalPageNumber

    return(
    <div className="TestFooter"><hr></hr>page {pageNumber} of {totalPageNumber}</div>
    )
}

export default Footer;