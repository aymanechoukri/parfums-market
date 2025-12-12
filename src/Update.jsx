import React, { useEffect, useState } from "react";
import Form from "./Components/Form";

export default function Update() {
  const [name, setName] = useState("ََ");
  const [email, setEmail] = useState("");



  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, [id]);


  return (
    <Form
      button={"Update"}
      Name={name}
      Email={email}
      link={`user/update/${id}`}
      local={"/dashbord/users"}
    />
  );
}
