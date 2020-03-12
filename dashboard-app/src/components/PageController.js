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
          comments: [],
          lastActiveCommentId: -1,
          informationFromApi: [],
          currentSelection: "",
          ToCSeed: "",
          showAllPages: false,
          currentPage: 1
        };
      }

      /**
       * Get a list of pages, each containing an object list based off the recursive object input
       * @param {[]} toc - the table of contents input list object
       * 
       * @returns {[{objectList: [], pageNumber: number}]} the list of paginated ToC elements
       */
      paginateToC(toc) {
        if (!toc) {
            return;
        }
        var paginatedList = [];
        var pageNumber = 1;
        for (var i = 0; i < toc.length; i++) {
          var currentObject = toc[i];
          var objectList = this.buildObjectList(currentObject, [], 0, null);
          
          paginatedList.push({"objectList":objectList, "pageNumber":pageNumber});
          pageNumber += 1;
        }
        return paginatedList;
      }

      /**
       * Recursive method that builds a list of all the objects on a single page, called from paginateToC()
       * @param {{}} currentObject The object to start at, containing an Access and an optional Sub list
       * @param {[]} objectList The list that is built recursively
       * @param {number} depth The current depth of the object, starting at 0 for highest in a page
       * @param {string} parent The current parent that is being recursed
       * 
       * @returns {[{object: {}, depth: number, parent: string}]} the built object list under the given current object
       */
      buildObjectList(currentObject, objectList, depth, parent) {
        objectList = objectList.splice(0); // duplicate the current list to prevent mutation
        objectList.push({"object": processApi(currentObject.Access), "depth": depth, "parent": parent});
        // if the object contains children, recurse through them
        if (currentObject.Sub) {
          for (var i = 0; i < currentObject.Sub.length; i++) {
            // add the child's objects to the current list
            objectList.push(...this.buildObjectList(currentObject.Sub[i], objectList, depth + 1, currentObject.Access));
          }
        }
        return objectList;
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
        var informationFromApi = this.paginateToC(toc)
        this.setState({
          ToCSeed: toc,
          informationFromApi
        })

        this.refArray = []
        this.updateRefArray(informationFromApi)
      } 

      /**
       * Callback for each comment box to update state, used by the nav buttons and comment boxes
       * If initializing, adds to the list of refs in the PageController state
       * If not initializing, updates the box given by ID to be the last focused one (used by nav)
       * @param {boolean} init true if initializing the component, false if sending an update
       * @param {Object} args an Object containing an id(int) of the box and, if initializing, a ref(Ref) of the textarea and page(number)
       */
      commentCallback(init, args) {
        if (init) {
          // add the ref to the list of comments
          this.setState(state => {
            const comments = state.comments.slice(0);
            comments[args.id] = {ref: args.ref, page: args.page, id: args.id};
            return { comments };
          });
        } else {
          // update this comment to be last focused
          this.setState({lastActiveCommentId: args.id})
        }
      }

      /**
       * Callback to switch the current page in single-page mode
       * @param {number} pageNumber The page to switch to
       */
      pageSwitchCallback(pageNumber) {
        this.setState({currentPage: pageNumber})
      }

      /**
       * Callback to switch the view mode to all page mode or one page mode, used by PageDisplayButtons
       * @param {boolean} showAllPages true for all page mode, false for one page mode
       */
      viewModeCallback(showAllPages) {
        this.setState({showAllPages});
      }

      /**
       * Gets the current page data if in single-page mode
       * @returns {{}} the object data of the current page, or null if it could not be found
       */
      getCurrentPageData() {
        for (var i = 0; i < this.state.informationFromApi.length; i++) {
          if (this.state.informationFromApi[i].pageNumber === this.state.currentPage) {
            return this.state.informationFromApi[i];
          }
        }
        return null;
      }
  
      //We will need to pass in props to report pages. Here we render the template page and then all info that 
      //Serge will pass to us
      render() {
        return (
        <div>
          <div className="ControllerContainer">
            <div className="ReportContainer">
              {this.state.informationFromApi.map((info, i)=>
                <div key={info.pageNumber} className={`Page${info.pageNumber} Wrapper`} ref={this.refArray[i]} hidden={!this.state.showAllPages && this.state.currentPage != info.pageNumber}>
                  <ReportPage commentCallback={this.commentCallback.bind(this)} key={info.pageNumber} pageJson={info}/>
                </div>)
              }
            </div>
            <div className="TOCContainer">
              <TableOfContents pageSwitchCallback={this.pageSwitchCallback.bind(this)} comments={this.state.comments}
                               lastActiveCommentId={this.state.lastActiveCommentId} refArray={this.refArray} tocJson={this.state.ToCSeed}
                               viewModeCallback={this.viewModeCallback.bind(this)} commentCallback={this.commentCallback.bind(this)}/>
            </div>
          </div>
        </div>
        );
      }
    }

export default PageController;
