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

        //STATE
        this.state = {
          informationFromApi,
          currentSelection: "",
          ToCSeed: "",
          //informationFromApi
        };
        this.setState({
          ToCSeed: toc
        })
        this.refArray = []
        this.updateRefArray(this.state.informationFromApi)
      }
        
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
/*
return (
  <div>
    <div><button onClick={() => {
      const newTasks = this.state.tasks.concat([{
        name: "Task " + this.state.tasks.length + 1,
        color: randomColor()
      }]);
      this.setState({tasks: newTasks});

      // We have to manually update the array
      // Error-prone!
      this.updateRefsArray(newTasks);
    }}>Add new Task</button></div>
    {this.state.tasks.map((task, i) => (
      <button
        key={i}
        onClick={() => { 
          // Notice we need to access the current attribute
          this.refsArray[i].current.scrollIntoView(); 
        }}>
        Go to {task.name}
      </button>
    ))}
    {this.state.tasks.map((task, i) => (
      <div 
        key={i}
        ref={this.refsArray[i]} 
        style={{height: "100px", backgroundColor: task.color}}>
        {task.name}
      </div>
    ))}
  </div>
);
*/