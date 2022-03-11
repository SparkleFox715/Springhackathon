
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

//

//https://stackoverflow.com/a/41970301

//

// You can choose your kind of history here (e.g. browserHistory)
import { Router, BrowserRouter } from 'react-router-dom';
// Your routes.js file
import routes from './routes';

//

ReactDOM.render(
  <React.StrictMode>
    <h1>test</h1>
    <BrowserRouter routes={routes}/>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
