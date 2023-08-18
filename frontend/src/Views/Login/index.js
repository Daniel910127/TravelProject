import React from 'react';
import LoginForm from "../../Components/LoginForm";
import NavBar from '../../Components/NavBar';
import { Container } from '@mui/material';
export default function Login() {
  return (
    <div>
      <NavBar/>
      <Container maxWidth='xs'>
        <LoginForm></LoginForm>
      </Container>
    </div>
  )
}
