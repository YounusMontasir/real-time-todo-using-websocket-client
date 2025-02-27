import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { loginWithGoogle, setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userID", usernameRef.current.value);
    usernameRef.current.value = "";
    navigate("/task");
  };

  const googleLogin = () => {
    loginWithGoogle().then((result) => {
      setUser(result.user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/task");
    });
  };

  return (
    <div>
     
        <button 
          onClick={googleLogin} 
          className="px-4 py-3 mt-4 bg-[#6C7D47] text-white  rounded-lg shadow hover:bg-blue-700">
          SIGN IN With Google
        </button>
      </div>
  );
};

export default Login;
