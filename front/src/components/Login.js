import { Navigate,useNavigate } from 'react-router';
import { useState,useEffect, useContext } from 'react';
import { UserContext } from '../Usercontext';



export default function Login() {
    const [redirect,setRedirect] = useState(false);
    const {setuserInfo} = useContext(UserContext);
    const [form, setForm] = useState({
      email: "",
      password: "",
    }); 
    
    // These methods will update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }

    var onSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
            headers : {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({email:form.email,password:form.password}),
          credentials:'include'
          })
          if(response.ok) {
            response.json().then(userInfo => {
              setuserInfo(userInfo);
              setRedirect(true);
            });
          }
          else{
            window.alert("invalid username or password")
          }
    }
    if (redirect) {
      return <Navigate to={'/'} />
    }
    return(
      <form className="mainpage" onSubmit={onSubmit}>
       <div className="form-group">
         <h1>Login</h1>
         <input
           type="email"
           className="form-control"
           id="email"
           placeholder='Email'
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
           required
         />
       </div>
       <div className="form-group">
         <input
           type="password"
           className="form-control"
           id="pass"
           placeholder='Password'
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
           required
         />
        </div>
        <div className="form-group">
         <input
           type="submit"
           value="Login"
           className="btn btn-primary"
         />
       </div>
      </form>
    );

}