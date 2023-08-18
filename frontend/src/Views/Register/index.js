import React from "react";
import RegisterForm from "../../Components/RegisterForm";
import { Container } from "@mui/material";
export default function Register() {
  return (
    <div>
      <Container maxWidth="xs">
        <RegisterForm></RegisterForm>
      </Container>
    </div>
  );
}
