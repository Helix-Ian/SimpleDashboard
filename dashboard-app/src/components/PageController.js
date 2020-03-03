import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TemplateOneTitlePage from './TemplateOnePages/TemplateOneTitlePage'
import TemplateOneTableOfContents from './TemplateOnePages/TemplateOneTableOfContents';


class PageController extends Component {

  
    //This will be where we triage out the work to create each of the pages
    render() {   
  
      return (
      <div>
        <TemplateOneTitlePage/>
        <TemplateOneTableOfContents/>
      </div>
      );
    }
  }

export default PageController;