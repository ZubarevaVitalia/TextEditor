import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EssayEditor from "./EssayEditor";
import View from "./ViewEssay";

//var ReactDOM = require('react-dom/client');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<EssayEditor/>}/>
          <Route path='/view' element={<View/>} />
      </Routes>
    </BrowserRouter>
);

/*const render = () =>
  ReactDOM.render(
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<EssayEditor/>}/>
          
      </Routes>
    </BrowserRouter>,
    document.getElementById('root'));

render();*/