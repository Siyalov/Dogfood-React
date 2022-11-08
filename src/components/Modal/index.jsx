import React, { useState } from "react";
import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "./style.css"

export default ({ isActive, changeActive }) => {
   return <div className={isActive ? "popup-box active" : "popup-box"} >
      <div className="popup">
         <XCircle className="popup-close" onClick={e => { changeActive(false) }} />
         <Form>
            <FormGroup>
               <FormLabel>Email</FormLabel>
               <FormControl type="email" />
            </FormGroup>
            <FormGroup>
               <FormLabel>Password</FormLabel>
               <FormControl type="password" />
            </FormGroup>
            <Button variant="warning" type="submit">Войти</Button>
         </Form>
      </div>
   </div >
}