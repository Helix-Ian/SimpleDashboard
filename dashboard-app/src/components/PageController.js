import React, { Component } from 'react';
import Axios from 'axios';
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
          currentPage: 1,
          accessData: {}
        };
        this.useLiveApi = true;
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
        var objectList = [];
        var pageNumber = 1;
        var totalPageNumber;

        // iterate over the first layer
        for (var i = 0; i < toc.length; i++) {
          var currentObject = toc[i];

          objectList = this.buildObjectList(currentObject, [], 0, null, false);
          var title = currentObject.Title;
          totalPageNumber = toc.length;
          paginatedList.push({"objectList":objectList, "pageNumber":pageNumber, title: title,  "totalPageNumber":totalPageNumber});
          pageNumber += 1;

          // if a second layer exists, iterate over that + recurse through its children
          if (currentObject.Sub) {
            for (var j = 0; j < currentObject.Sub.length; j++) {
              objectList = this.buildObjectList(currentObject.Sub[j], [], 0, null, true);
              paginatedList.push({"objectList":objectList, "pageNumber":pageNumber, title: currentObject.Sub[j].Title});
              pageNumber += 1;
            }
          }
        }

        totalPageNumber = pageNumber - 1;
        paginatedList.map(pl => (pl['totalPageNumber'] = totalPageNumber));

        return paginatedList;
      }

      /**
       * Recursive method that builds a list of all the objects on a single page, called from paginateToC()
       * @param {{}} currentObject The object to start at, containing an Access and an optional Sub list
       * @param {[]} objectList The list that is built recursively
       * @param {number} depth The current depth of the object, starting at 0 for highest in a page
       * @param {string} parent The current parent that is being recursed
       * @param {boolean} recurse Whether to add the children of the object to the list
       * 
       * @returns {[{object: {}, depth: number, parent: string}]} the built object list under the given current object
       */
      buildObjectList(currentObject, objectList, depth, parent, recurse) {
        objectList = objectList.splice(0); // duplicate the current list to prevent mutation
        objectList.push({"object": (this.useLiveApi ? this.state.accessData[currentObject.Access] : processApi(currentObject.Access)), "access": currentObject.Access, "depth": depth, "parent": parent});
        // if the object contains children, recurse through them
        if (recurse && currentObject.Sub) {
          for (var i = 0; i < currentObject.Sub.length; i++) {
            // add the child's objects to the current list
            objectList.push(...this.buildObjectList(currentObject.Sub[i], objectList, depth + 1, currentObject.Access, recurse));
          }
        }
        return objectList;
      }

      /**
       * Recursively build and return a list of all the Access fields in the ToC data
       * @param {[]} data the table of contents API object
       */
      buildAccessList(data) {
        var accessList = [];
        for (var i = 0; i < data.length; i++) {
          var currentObj = data[i];
          accessList.push(currentObj.Access);
          if (currentObj.Sub) {
            accessList.push(...this.buildAccessList(currentObj.Sub));
          }
        }
        return accessList;
      }

      //updates refArray with Ref for each index. 
      updateRefArray(dataArray) {
        this.refArray = dataArray.map(() => React.createRef()); 
      }

      componentDidMount = () => {
        if (this.useLiveApi) {
          const toc_url = "https://dev-reporting-api.armorpoint.com/api/Queries/ToC";
          const access_url = "https://dev-reporting-api.armorpoint.com/api/Queries/ACCESS/Data";
          
          this.refArray = []
          // Get the ToC data
          Axios.get(toc_url)
            .then((response) => {
              var tocResponse = response.data.ToC;
              var accessList = this.buildAccessList(tocResponse);

              // build a list of calls to get the access data
              var accessCalls = accessList.map((access) => Axios.get(access_url.replace('ACCESS', access)));

              // get the access data
              Axios.all(accessCalls).then(Axios.spread((...responses) => {
                var accessData = {};
                // add each response to the accessData object
                for (var i = 0; i < responses.length; i++) {
                  var responseData = responses[i];
                  var dataObj = responseData.data;

                  if (dataObj) {
                    // ---- TEMPORARY until the API is fixed to return the correct access ----
                    var access = responseData.config.url.substring(53, responseData.config.url.length - 5);
                    dataObj.Access = access;
                    // ----

                    accessData[dataObj.Access] = dataObj;
                  }
                }
                this.setState({accessData});

                // build the informationFromApi object 
                var informationFromApi = this.paginateToC(tocResponse);
                this.setState({informationFromApi});
                this.updateRefArray(informationFromApi);
              }));
              
              this.setState({ToCSeed: tocResponse});
            });
        } else {
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
          this.setState({lastActiveCommentId: args.id});
          this.setState({currentPage: this.state.comments[args.id].page});
        }
      }

      /**
       * Callback to switch the current page in single-page mode
       * @param {number} pageNumber The page to switch to
       */
      pageSwitchCallback(pageNumber) {
        if (!this.state.showAllPages) {
          this.setState({currentPage: pageNumber});
        }
      }

      /**
       * Callback to switch the view mode to all page mode or one page mode, used by PageDisplayButtons
       * @param {boolean} showAllPages true for all page mode, false for one page mode
       */
      viewModeCallback(showAllPages) {
        this.setState({showAllPages});
      }

      /**
       * Returns true if the page is still loading
       */
      isLoading() {
        return this.state.informationFromApi.length === 0;
      }
  
      //We will need to pass in props to report pages. Here we render the template page and then all info that 
      //Serge will pass to us
      render() {
        return (
        <div>
          <div className="LoadingContainer" hidden={!this.isLoading()}>
            <div className="LoadingSpinner">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
          <div hidden={this.isLoading()} className="ControllerContainer">
            <div className="ReportContainer">
              {this.state.informationFromApi.map((info, i)=>
                <div key={info.pageNumber} className={`Page${info.pageNumber} Wrapper`} ref={this.refArray[i]} hidden={!this.state.showAllPages && this.state.currentPage !== info.pageNumber}>
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
