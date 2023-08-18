import {Box} from "@mui/material";
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
        return <div>Доступ запрещён</div>
    }
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