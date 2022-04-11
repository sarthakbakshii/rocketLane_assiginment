import { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import Pusher from 'pusher-js';
import env from "react-dotenv";
import {MainContainer} from './Components/MainContainer';
import './App.css';

import { PusherProvider } from "@harelpls/use-pusher";
import { Nav } from './Components/Nav';
import axios from 'axios';

// let apikey =  process.env.React_App_API_KEY
// apikey = apikey.split("")
// apikey.pop() 
// apikey.shift()
// apikey = apikey.join("")




const config = {

  clientKey: process.env.React_App_API_KEY,
  cluster: process.env.React_App_cluster ,
  triggerEndpoint: "/pusher/trigger",
  authEndpoint: "/pusher/auth",
  auth: {
    headers: { Authorization: "Bearer token" },
  },
};


function App() {

  const [text , stetext ] = useState([])

  useEffect( () =>{
      axios("https://jsonplaceholder.typicode.com/photos")
      .then( ({data}) =>{
        stetext(data)
      })
  }, [])

  return (
    <div className="App">

     <PusherProvider {...config}>
         <Nav/>
         <MainContainer/>
     </PusherProvider>; 

    </div>
  );
}

export default App;
