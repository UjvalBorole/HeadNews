
import './App.css';

import React, { useState } from 'react'
import NavBar from './component/Navbar';
import News  from './component/News';
import {
  HashRouter as Router,
  Route,Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=>{
  const apikey = process.env.REACT_APP_NEWS_API;
const pagesize = 5;
const [progress,setProgress] = useState(0);
 
  
    return (
      <div>
      <Router>
      <NavBar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)} // when your progress bar will finish
      />
      
      <Routes>
      <Route exact path="/" element={ <News setProgress={ setProgress} apikey={ apikey} key="general" active= "active" pageSize={74} country='in' category="general"/>}></Route>
      <Route exact path="/business" element={ <News setProgress={ setProgress} apikey={ apikey} key="business" pageSize={pagesize} country='in' category="business"/>}></Route>
      <Route exact path="/entertainment" element={ <News setProgress={ setProgress} apikey={ apikey} key="entertainment" pageSize={pagesize} country='in' category="entertainment"/>}></Route>
      <Route exact path="/general" element={ <News setProgress={ setProgress} apikey={ apikey} key="general" pageSize={pagesize} country='in' category="general"/>}></Route>
      <Route exact path="/health" element={ <News setProgress={ setProgress} apikey={ apikey} key="health" pageSize={pagesize} country='in' category="health"/>}></Route>
      <Route exact path="/science" element={ <News setProgress={ setProgress} apikey={ apikey} key="science" pageSize={pagesize} country='in' category="science"/>}></Route>
      <Route exact path="/sports" element={ <News setProgress={ setProgress} apikey={ apikey} key="sports" pageSize={pagesize} country='in' category="sports"/>}></Route>
      <Route exact path="/technology" element={ <News setProgress={ setProgress} apikey={ apikey} key="technology" pageSize={pagesize} country='in' category="technology"/>}></Route>

      </Routes>
      
       </Router>
      </div>
    )

}
export default App

