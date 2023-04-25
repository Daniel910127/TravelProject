import React from "react";

export default function MyButton(props) {
  const { title } = props;
  return <button style={{ padding: "6px" ,bgColor:'#1976d2'}}>{title}</button>;
}
