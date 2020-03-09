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

        //Set initial state here for anything inside of the page controller
        this.state = {
          informationFromApi,
          currentSelection: "",
          ToCSeed: "",
        };

        this.refArray = []
        this.updateRefArray(this.state.informationFromApi)
      }
      //updates refArray with Ref for each index. 
      updateRefArray(dataArray) {
        this.refArray = dataArray.map(() => React.createRef()); 
      }

      componentDidMount = () => {
        //kick off apis here
        var tocJson = processApi("ToC")
        var toc = tocJson.ToC
        this.setState({
          ToCSeed: toc
        })

      } 
  
      //We will need to pass in props to report pages. Here we render the template page and then all info that 
      //Serge will pass to us
      render() {

        return (
        <div>
          <div className="ControllerContainer">
            <div className="ReportContainer">
              {this.state.informationFromApi.map((info, i)=>
                <div key={i} className={`Page${info.pageNumber} Wrapper`} ref={this.refArray[i]}>
                  <ReportPage key={info.pageNumber} pageJson={info}/>
                </div>
              )}
            </div>
            <div className="TOCContainer">
              <TableOfContents refArray={this.refArray} tocJson={this.state.ToCSeed}/>
            </div>
          </div>
        </div>
        );
      }
    }

export default PageController;
