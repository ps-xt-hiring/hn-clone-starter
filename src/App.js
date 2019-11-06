import './App.css';

import React, {propTypes} from 'react';
import {connect } from 'react-redux';

class App extends React.Component{

render(){
  console.log(this.props);
    return(
        <div className="">
         <p>Hello.</p>
           
        </div>


    );
}
}
App.propTypes = {
 
};

function mapStateToProps(state, ownProps){
    return {
      
    };

}
export default connect(mapStateToProps)(App);
