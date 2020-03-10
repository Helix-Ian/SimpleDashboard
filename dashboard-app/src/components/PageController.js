import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import ReportPage from './TemplateOnePages/ReportPage';
import TableOfContents from './TemplateOnePages/TableOfContents';
import {processApi} from './APIHandler';


class PageController extends Component {

    constructor(props) {
        super(props);
        //Set initial state here for anything inside of the page controller
        this.state = {
          commentRefs: [],
          lastActiveCommentId: -1,
          informationFromApi: [],
          currentSelection: "",
          ToCSeed: ""
        };
        this.pageNumber = 1;
      }

      /**
       * This recrusive function goes into nested layers of the ToC and returns one list of paginated items
       * @param info - the information of the current "depth" of the table of contents we are in
       * @param paginatedList - maintained paginated list that will be used to populate report pages
       * 
       * @return the list of paginated ToC elements in the recursive process
       */
      paginateToC(info, paginatedList) {
        if (!info) {
            return;
        }
       for (var i = 0; i < info.length; i++) {
           var currentObject = info[i];
           var currentAccess = currentObject.Access;
           paginatedList.push({"objectList":[processApi(currentAccess)], "pageNumber":this.pageNumber});
           this.pageNumber += 1;
       }
       return paginatedList;
      }

      //updates refArray with Ref for each index. 
      updateRefArray(dataArray) {
        this.refArray = dataArray.map(() => React.createRef()); 
      }

      componentDidMount = () => {
        //kick off apis here
        var tocJson = processApi("ToC")
        var toc = tocJson.ToC

        //Massage Data from ToC Api to first a list format for each report page
        var informationFromApi = this.paginateToC(toc, [])
        this.setState({
          ToCSeed: toc,
          informationFromApi
        })

        this.refArray = []
        this.updateRefArray(informationFromApi)
      } 

      /**
       * Callback for each comment box to update state, used by the nav buttons
       * If initializing, adds to the list of refs in the PageController state
       * If not initializing, updates the box given by ID to be the last focused one (used by nav)
       * @param {boolean} init true if initializing the component, false if sending an update
       * @param {Object} args an Object containing an id(int) of the box and, if initializing, a ref(Ref) of the textarea
       */
      commentCallback(init, args) {
        if (init) {
          // add the ref to the list of comments
          this.setState(state => {
            const commentRefs = state.commentRefs.slice(0);
            commentRefs[args.id] = args.ref;
            return { commentRefs: commentRefs };
          });
        } else {
          // update this comment to be last focused
          this.setState({lastActiveCommentId: args.id})
        }
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
                  <ReportPage commentCallback={this.commentCallback.bind(this)} key={info.pageNumber} pageJson={info}/>
                </div>
              )}
            </div>
            <div className="TOCContainer">
              <TableOfContents commentRefs={this.state.commentRefs} lastActiveCommentId={this.state.lastActiveCommentId} refArray={this.refArray} tocJson={this.state.ToCSeed}/>
            </div>
          </div>
        </div>
        );
      }
    }

export default PageController;
