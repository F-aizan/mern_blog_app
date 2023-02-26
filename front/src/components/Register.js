import { useNavigate } from 'react-router';
import { useState,useEffect } from 'react';



export default function Register() {
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      confpass: ''
    }); 
    const navigate = useNavigate();
    
    // These methods will update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }

    var onSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:form.email,password:form.password}),
        })
        .then(() => window.alert("user registered successfully"))
        .then(() => navigate("/login"))
        .catch((err) => window.alert(err))
    }
    return(
      <form className="mainpage" onSubmit={onSubmit}>
       <div className="form-group">
           <h1>Register</h1>
         <input
           type="text"
           className="form-control"
           id="name"
           placeholder='Full Name'
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           required
         />
       </div>
       <div className="form-group">
         <input
           type="email"
           placeholder='Email'
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
           required
         />
        </div>
        <div className="form-group"></div>
       <div className="form-group">
         <input
           type="password"
           placeholder='Password'
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
           required
         />
        </div>
        <div className="form-group">
        <div className="form-group">
         <input
           type="password"
           className="form-control"
           id="confpass"
           placeholder='Confirm Password'
           value={form.confpass}
           onChange={(e) => updateForm({ confpass: e.target.value })}
           required
         />
        </div>
        <div className="form-group">
         <input
           type="submit"
           value="Register"
           className="btn btn-primary"
         />
         </div>
       </div>
      </form>
    );

}