import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class GreetingPage extends Component  {

 render() {  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Publicis Sapient - XT hiring challenge!!</h1>
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
           and save to reload. Refactor at will, but please do not
           modify the entry point
          {' '}
          <code>index.js</code>
.
        </p>


        <p style={{background: 'black', color: 'white'}}>
         <b>Unable to run app, so I had remove the eslint dependency</b>   
        -plugin-import@2.14.0" has incorrect peer dependency "eslint@2.x - 5.x".
        warning " > eslint-plugin-jsx-a11y@6.1.2" has incorrect peer dependency "eslint@^3 || ^4 || ^5".
        warning " > eslint-plugin-react@7.11.1" has incorrect peer dependency "eslint@^3.0.0 || ^4.0.0 || ^5.0.0".
        warning " > eslint-config-airbnb@17.1.0" has incorrect peer dependency "eslint@^4.19.1 || ^5.3.0".
        warning "eslint-config-airbnb > eslint-config-airbnb-base@13.1.0" has incorrect peer dependency "eslint@^4.19.1 || ^5.3.0".
        </p>

      </header>
    </div>
  );
 }

}