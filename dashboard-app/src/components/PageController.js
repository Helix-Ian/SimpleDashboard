import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import ReportPage from './TemplateOnePages/ReportPage';
import TableOfContents from './TemplateOnePages/TableOfContents';
import {processApi} from './APIHandler';


class PageController extends Component {

    constructor(props) {
        super(props);
        // Call API to get Table of Contents
        var tocJson = processApi("ToC")
        var toc = tocJson.ToC

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
          currentSelection: "",
          ToCSeed: ""
        };

        //Put bound functions below
        this.setCurrentPage = this.setCurrentPage.bind(this)
      }

      componentDidMount() {
        //kick off apis here
        var tocJson = processApi("ToC")
        var toc = tocJson.ToC
        this.setState({
          ToCSeed: toc
        })
      }     

      setCurrentPage(e, key){
        this.setState({
          currentSelection: key
        })
      }
  
      //We will need to pass in props to report pages. Here we render the template page and then all info that 
      //Serge will pass to us
      render() {
  
        return (
        <div>
          <div className="ControllerContainer">
            <div className="ReportContainer">
              {this.state.informationFromApi.map(info =>
                  <ReportPage key={info.pageNumber} pageJson={info}/>
              )}
            </div>
            <div className="TOCContainer">
              <TableOfContents onClick={this.setCurrentPage} tocJson={this.state.ToCSeed}/>
            </div>
          </div>
        </div>
        );
      }
    }

export default PageController;