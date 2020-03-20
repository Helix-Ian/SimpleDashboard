import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const UserDashboard = props => {
  const columns = props.columns;
  const users = props.users;
  const reports = [
    {
      reportName: 'ArmorPoint Report',
      companyName: 'ArmorPoint',
      sectorName: 'Technology',
      creationDate: '1/31/20',
      relationshipName: 'John Doe',
      viewReport: ''
    },
    {
      reportName: 'Network Report',
      companyName: 'Generic Solutions',
      sectorName: 'Web Services',
      creationDate: '11/29/19',
      relationshipName: 'Bad Bunny',
      viewReport: ''
    },
    {
      reportName: 'Vulnerability Report',
      companyName: 'Cloud Protector',
      sectorName: 'Security & Defense',
      creationDate: '12/11/19',
      relationshipName: 'J. Balvin',
      viewReport: ''
    },
    {
      reportName: 'Comprehensive Report',
      companyName: 'Web Company',
      sectorName: 'Web Hosting',
      creationDate: '12/4/19',
      relationshipName: 'Mike Smith',
      viewReport: ''
    }
  ];

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    th: {
      borderBottom: 1
    }
  });

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='caption table'>
          <caption>Helix CP © 2020</caption>
          <TableHead>
            <TableRow className='tableRow'>
              {columns.map(col => (
                <TableCell key={col.name}>{col.text}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map(report => (
              <TableRow key={report.reportName}>
                <TableCell component='th' scope='row'>
                  {report.reportName}
                </TableCell>
                <TableCell align='left'>{report.companyName}</TableCell>
                <TableCell align='left'>{report.sectorName}</TableCell>
                <TableCell align='left'>{report.creationDate}</TableCell>
                <TableCell align='left'>{report.relationshipName}</TableCell>
                <TableCell align='left'>
                {/*  <Link to='/page-controller' className='addLink'>
                    <Button color='primary' variant='contained'>
                      View Report
                    </Button>
            </Link> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDashboard;
