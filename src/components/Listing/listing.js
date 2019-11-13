import React, {Component} from 'react';
import { findDomain } from "../../utilities"



class Listing extends Component{
            constructor(){
                super();
            }


            ShowMoreItems = () => {
                    
            }
            

            render(){
              
             return(
                 <React.Fragment>
                     {this.props.productData.map((item) => {
                        let objId = item.objectID
                        // console.log(item)
                     return(<div key={item.objectID} className="listing">
                     <div className="listing--num-comments">{item.num_comments}</div>
                     <div className="listing--points">{item.points}</div>
                     <div className="listing--title">{item.title}</div>
                     <div className="listing--linkDomain">{item.author}</div>
                     <div className="listing--userName">{findDomain(item.url) ||  " "}</div>
                     <div className="listing--postedWhen">{item.created_at}</div>
                         
                     
                     <br/>

                     <span onClick = {() => this.props.hideItems(objId)}>Hide</span>
                      
                        <br/>
                     <span onClick={() => this.props.upWard(objId)}>UpVote</span>{item.points}
                     
                     <hr/>
                        <hr/>
                     </div>)
                     })}

                     <br/>

                     <br/>

                    
                 </React.Fragment>
             )
            }
            // #828282

        }


export default Listing;