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
         <Table columns={columns} users={users}></Table>
      </table>
    )
};

const Table = (props) => {
   const columns = props.columns;
   const users = props.users;

   return (
      <tbody>
         {users.map(user => <TableRow key={user._id} columns={columns} user={user}></TableRow>)}
      </tbody>
   );
};

const TableRow = (props) => { return (<tr><td>{props.user._id}</td></tr>); };

export default UserDashboard;