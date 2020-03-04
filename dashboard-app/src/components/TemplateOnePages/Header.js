import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const Header = (props) => {
    var title = props.title

    return(
        <div className="TestHeader">
            <div>Header: {title}</div>
        </div>
    )
}

export default Header;