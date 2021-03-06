import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { axiosWithAuthBusiness } from "../utils/axiosWithAuth";

const BusinessForm = props => {
  //set local state here
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  //set login event
  const businessLogin = e => {
    console.log("props2 ", props);
    e.preventDefault();
    axios
      .post("https://bw-replate.herokuapp.com/api/auth/business/login", login)
      .then(res => {
        console.log(res.data.user);
        localStorage.setItem("token", res.data.token);
        props.history.push("/business-home", { detail: res.data });
      })
      .catch(err => console.log(err));
  };
  //change handler
  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Business User Login</h2>
      <form onSubmit={businessLogin}>
        <div>
          <input
            component="input"
            type="text"
            name="username"
            placeholder="Enter user name"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            component="input"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
