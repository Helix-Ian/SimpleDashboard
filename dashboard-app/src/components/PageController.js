import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import TemplateOneTitlePage from './TemplateOnePages/TemplateOneTitlePage'
import TemplateOneTableOfContents from './TemplateOnePages/TemplateOneTableOfContents';
import ReportPage from './TemplateOnePages/ReportPage';
import TableOfContents from './TemplateOnePages/TableOfContents';


class PageController extends Component {
    constructor(props) {
        super(props);
        //This is just test information to show population of ReportPage
        var reportPageInfo1 = {"objectList":[{"id":"SampleID", "type":"PieChart"},{"id":"SampleID1", "type":"PieChart"}], "title":"Great First Page", "pageNumber":1}
        var reportPageInfo2 = {"objectList":[{"id":"SampleID2", "type":"InformationText"},{"id":"SampleID3", "type":"InformationText"}], "title":"Great Second Page", "pageNumber":2}
        var reportPageInfo3 = {"objectList":[{"id":"SampleID4", "type":"InformationText"},{"id":"SampleID5", "type":"PieChart"}], "title":"OK Third Page", "pageNumber":3}
        var informationFromApi = [reportPageInfo1, reportPageInfo2, reportPageInfo3]
        this.state = {
          informationFromApi: informationFromApi,
          currentSelection: "",
        };

        //Put bound functions below
        this.setCurrentPage = this.setCurrentPage.bind(this)
      }

    setCurrentPage(e, randomSeed){
      this.setState({
        currentSelection: randomSeed
      })
     }
  
    //We will need to pass in props to report pages. Here we render the template page and then all info that 
    //Serge will pass to us
    render() {   
  
      if(this.state.currentSelection === "") {
        return (
        <div>
          <TemplateOneTitlePage/>
          <TableOfContents onClick={this.setCurrentPage}/>
          {this.state.informationFromApi.map(info =>
              <ReportPage pageJson={info}/>
          )}
        </div>
        );
      } else {
        return (
          <div>
            <TemplateOneTitlePage/>
            <TableOfContents onClick={this.setCurrentPage}/>
            <ReportPage pageJson={this.state.informationFromApi[this.state.currentSelection]}/>
          </div>
          );
      }
    }
  }

export default PageController;