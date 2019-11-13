import React, {Component} from 'react';



class Listing extends Component{
            constructor(){
                super();
            }


            ShowMoreItems = () => {
                    
            }
            

            render(){
              
             return(
                 <div>
                     {this.props.productData.map((item) => {
                        let objId = item.objectID
                        // console.log(item)
                     return(<div>{item.title}
                     
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

                    
                 </div>
             )
            }

        }


export default Listing;