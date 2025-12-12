import Form from "./Components/Form";

export default function CreateUser() {
    return(
        <Form 
        button={"create"}
        link={"user/create"}
        local={"/dashbord/users"}
        />
    )
}