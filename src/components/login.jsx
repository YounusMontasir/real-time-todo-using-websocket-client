import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const {loginWithGoogle, setUser} = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("userID", usernameRef.current.value);
    usernameRef.current.value = "";
    navigate("/task");
  }
  const googleLogin = () =>{
    loginWithGoogle()
    .then(result=>{
      setUser(result.user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/task");
    })
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        {/* <label htmlFor="username">Provide a username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          ref={usernameRef}
        /> */}
        <button onClick={googleLogin}>SIGN IN With Google</button>
        
      </form>
    </div>
  );
};

export default Login;