import Form from "./Components/Form";
import Header from "./Components/Header";

export default function Signup() {
  return (
    <div>
      <Header />
      <Form
        button={"Register"}
        link={"register"}
        local={"/"}
      />
    </div>
  );
}
