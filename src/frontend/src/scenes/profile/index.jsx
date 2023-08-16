import {Box} from "@mui/material";
import Header from "../../components/Header";

const Profile = () => {
    const clickbuttn = () => {
        localStorage.removeItem('token')
        console.log("delete")
    }
    return (
        <Box m="20px">
            <Header title="Hello profile"/>
            <button onClick={clickbuttn}>удалить токен</button>
        </Box>
    )
}
export default Profile;