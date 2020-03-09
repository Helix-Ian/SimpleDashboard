import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import TemplateOneTitlePage from './TemplateOnePages/TemplateOneTitlePage'
import TemplateOneTableOfContents from './TemplateOnePages/TemplateOneTableOfContents';
import ReportPage from './TemplateOnePages/ReportPage';
import {processApi} from './APIHandler';


class PageController extends Component {
    constructor(props) {
        super(props);
        // Call API to get Table of Contents
        var toc = processApi("ToC").ToC

        //Massage Data from ToC Api to first a list format for each report page
        //TODO

        //Create page content based on ToC
        var informationFromApi = [];
        var currPageNumber = 1;
        for (var item of toc) {
          var currentAccess = item.Access;
          informationFromApi.push({"objectList":[processApi(currentAccess)], "pageNumber":currPageNumber});
          currPageNumber++;
        }
       this.state = {
          informationFromApi: informationFromApi,
        };
      } 
  
    //We will need to pass in props to report pages. Here we render the template page and then all info that 
    //Serge will pass to us
    render() {   
  
      return (
      <div>
        <TemplateOneTitlePage/>
        {this.state.informationFromApi.map(info =>
            <ReportPage key={info.pageNumber} pageJson={info}/>
        )}
      </div>
      );
    }
  }

export default PageController;