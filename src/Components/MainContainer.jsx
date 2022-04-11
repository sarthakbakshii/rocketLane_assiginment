import "./MainContainer.scss";
import Pusher  from 'pusher-js';
import env from "react-dotenv";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { SingleTaskDisplay } from "./SingleTaskDisplay";
import { useChannel , useEvent } from "@harelpls/use-pusher";


export const MainContainer = () =>{

  const [newActivity, setnewActivity] = useState({ taskName : "" , projectName : "" , isBillable : false })
  const [allActivity ,setAllActivity] = useState([]);
  const [btnDisable , setgBtnDisable] = useState(true)

//   -------------- pusher config
    const channel = useChannel("sarthak-name");
     useEvent(channel, "sarthak-event", ( data ) =>{
                //  console.log(data)
                 setAllActivity( (prev) => [...prev, {...data}]);
            }
        );

 
  const changeHandler = (e) => {
      let {name} = e.target;
      if( e.target.type == "checkbox" ){
          // setnewActivity({...newActivity , [name] : !newActivity[name]})
          setnewActivity({...newActivity , [name] : e.target.checked})
      }
      else{
          setnewActivity({...newActivity , [name] : e.target.value})
      }

      if( newActivity.projectName !== "" && newActivity.taskName !== ""){
          setgBtnDisable(false)
      }
  }

  const clearHandler = () => {
    setnewActivity({taskName : "" , projectName : "" , isBillable : false });
    setgBtnDisable(true)
  }

  const submitHandler = () =>{

    let userInfo = JSON.parse( sessionStorage.getItem("userDtl") )
    // console.log( userInfo )

    if( !userInfo ){
        alert("you have to loging first");
        return;
    }
    

    let newAcc = {...newActivity , userId : userInfo.userId }

    axios.post("https://my-json-server.typicode.com/karthick03/json-db-data/tasks", newAcc )
    .then( ({data}) =>{
            setAllActivity( prev => {
                return [...prev, {...data}]
            })
    })

    // let apikey =  process.env.React_App_API_KEY
    //     apikey = apikey.split("")
    //     apikey.pop()
    //     apikey.pop() 
    //     apikey.shift()
    //     apikey = apikey.join("")

    // const pusher = new Pusher({
    //     appId: process.env.React_App_ID,
    //     key: apikey,
    //     secret: process.env.React_App_sec,
    //     cluster: process.env.React_App_cluster,
    //     encrypted: true,
    // });
    // pusher.trigger("sarthak-name", "sarthak-event", newActivity);
    
    clearHandler()



  }

  useEffect( () =>{
             axios.get("https://my-json-server.typicode.com/karthick03/json-db-data/tasks")
             .then( ({data}) => setAllActivity(data) )
  }, []);


//   useEffect( () =>{

//       var pusher = new Pusher( process.env.React_App_API_KEY , {
//                     cluster:  process.env.React_App_cluster ,
//                   });

//       var channel = pusher.subscribe('my-channel');
//         channel.bind('my-event', function(data) {
//                 //  alert(JSON.stringify(allActivity));
//                 console.log("get event ", data )
//            });

//   }, [])



    return <div className="container">
                    <header> Activities </header>
                    <section className="inputSection">
                           
                        <div className="inputText taskText">
                                <label > <span className="red">*</span> Project name</label>
                                <input type="text" 
                                className="input"  
                                name='taskName' 
                                onChange={changeHandler}
                                placeholder="Eg. Nike Implimentation"
                                value={newActivity.taskName} />
                        </div>

                        <div className="inputText descText">
                                <label> <span className="red">*</span> task name</label>
                                <input type="text" 
                                className="input" 
                                name='projectName'
                                onChange={changeHandler}
                                placeholder="Eg. kick-off call"
                                value={newActivity.projectName} />
                        </div>

                         <div className="inputText checkboxText">
                                <label > Billable </label>
                                <input type="checkbox"  
                                onChange={changeHandler} 
                                checked={newActivity.isBillable} 
                                name="isBillable"  />
                        </div>

                    
                    </section>
                    
                    <section className="displaySection">
                            <h4>Team tasks</h4>
                            {
                                allActivity.map( item =>{
                                    return <SingleTaskDisplay 
                                           data={item} key={ Math.random() } 
                                          setAllActivity={setAllActivity} 
                                          allActivity={allActivity} />
                                })
                            }
                    
                    </section>


                    <footer>
                            <button className="cancleBtn"> Cancle </button>

                            <button className="saveBtn"
                             disabled={btnDisable}
                             onClick={submitHandler} > Add activity </button>
                    
                    </footer>
           
           </div>
}