import React, { useState } from "react";
import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "./style.css"

export default ({ isActive, changeActive, api, setToken }) => {
   const [email, setEmail] = useState("")
   const [pwd, setPwd] = useState("")
   const handler = e => {
      e.preventDefault();
      api.logIn({ email: email, "password": pwd })
         .then(data => {
            localStorage.setItem('shop-user', data.token);
            setToken(data.token || '');
            setEmail("");
            setPwd("");
            if (data.token) {
               changeActive(false);
            }
         });
   }

   return <div className={isActive ? "popup-box active" : "popup-box"} >
      <div className="popup">
         <XCircle className="popup-close" onClick={e => { changeActive(false) }} />
         <Form>
            <FormGroup>
               <FormLabel>Email</FormLabel>
               <FormControl
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </FormGroup>
            <FormGroup>
               <FormLabel>Password</FormLabel>
               <FormControl
                  type="password"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
               />
            </FormGroup>
            <Button variant="warning" type="submit" onClick={handler}>Войти</Button>
         </Form>
      </div>
   </div >
}