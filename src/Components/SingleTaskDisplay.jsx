import "./SingleTaskDisplay.scss"
import { AiOutlineDollar } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

export const SingleTaskDisplay = ({data , allActivity , setAllActivity }) =>{

        const deleteHandler = () =>{
            let loginInfo = JSON.parse( sessionStorage.getItem("userDtl") )
                if( loginInfo ){
                        if( loginInfo.userId ==  data.userId ){

                                fetch(`https://my-json-server.typicode.com/karthick03/json-db-data/tasks/${data.id}`,{
                                        method : 'DELETE',
                                        headers: { 'Content-type': 'application/json; charset=UTF-8'  }
                                })
                                .then( res =>{
                                        alert("deleted");

                                        let newData = allActivity.filter( a =>{
                                                return a.id !== data.id
                                        });
                                        
                                        setAllActivity(newData)
                                });
                        }
                        else{
                                alert("you are not the creator of this, so you cant delete it")
                        }

                }
                else{
                        alert("you have to login first to delete")
                }
                // console.log( data.userId , data.id)
        }

    return <div className="cont"> 
                    <div className="dataBox">
                            <div className="heading"> {data.taskName}</div>
                            <div className="title"> 
                                   { 
                                     data.isBillable && <AiOutlineDollar style={ {marginRight : "10px"} } /> 
                                   }
                                   {data.projectName}
                            </div>
                    </div>
                    <MdDeleteOutline className="deleteBtn" 
                     onClick={ deleteHandler }  />

           </div>
}