import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';

const UserDashboard = (props) => {
    const columns  = props.columns;
    const users = props.users;

    return(
        <table>
         <thead>
            <tr className= "tableRow">
               {columns.map(col =>
                  <th key={col.name}>{col.text}</th>
               )}
            </tr>
         </thead>
      </table>
    )
};

export default UserDashboard;