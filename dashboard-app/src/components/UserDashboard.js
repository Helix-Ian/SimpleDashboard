import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const UserDashboard = (props) => {
    const columns  = props.columns;
    const users = props.users;

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
        th: {
            borderBottom: 1

        }
      });

    const classes = useStyles();

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                <caption>Cool Caption</caption>
                <TableHead>
                    <TableRow className= "tableRow">
                        {columns.map(col =>
                            <TableCell key={col.name}>{col.text}</TableCell>
                        )}>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                    <TableRow key={user.fName}>
                        <TableCell component="th" scope="row">
                        {user.fName}
                        </TableCell>
                        <TableCell align="left">{user.mName}</TableCell>
                        <TableCell align="left">{user.lName}</TableCell>
                        <TableCell align="left">{user.age}</TableCell>
                        <TableCell align="left">{user.birthDate}</TableCell>
                        <TableCell align="left">{user.manager}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default UserDashboard;
