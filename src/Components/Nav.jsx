import { useState } from "react"
import "./Nav.scss"
import { MdAccountCircle } from "react-icons/md";

export const Nav = () =>{
    const [text,setText] = useState("");
    const [isLogedin , setIsLogedIn] = useState(false)

    const demo_login_data = [
        { name : "me" , userId : 1},
        { name : "you" , userId : 2},
        { name : "sarthak" , userId : 3}
    ]

    const loginHandler = () =>{
        
        let data = [...demo_login_data];
        data = data.filter( a =>{
            return (a.name == text)
        });
        data = data[0]

        if( !data ){
            alert("invalid user")
        }
        else{
            sessionStorage.setItem("userDtl" , JSON.stringify(data))
        }

        setText("")
    }

    const logOutHandler = () =>{
        sessionStorage.removeItem('userDtl');
        setIsLogedIn( !isLogedin)
    }

   

    return <nav>
             {
                JSON.parse( sessionStorage.getItem("userDtl") )
                    ?
                 <Logout logOutHandler={logOutHandler} />
                    :
                 <Login text={text} 
                 loginHandler={loginHandler} 
                 setText={setText} />
                 
             }
             

                
            </nav>
}

const Login = ({text, setText ,loginHandler}) =>{
    return <>
                <input type="text" value={text}  
                onChange={ (e) =>{
                      setText(e.target.value)
                }} />

                <button onClick={loginHandler}> login </button>
           </>
};

const Logout = ({logOutHandler}) =>{
    return <>
                <div className="heading" > 
                  <MdAccountCircle className="contactIcon"  /> 

                  {JSON.parse( sessionStorage.getItem("userDtl")).name } 

                </div>
                <button onClick={logOutHandler}> Logout </button>
           </>
}