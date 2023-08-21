import {Box} from "@mui/material";
import Header from "../../components/Header";
import {useAuth} from "../../components/AuthProvider";

const Profile = () => {
    const {tokenExists,logout} = useAuth();

    if (!tokenExists) {
        return <div>Доступ запрещён</div>
    }
    const clickbuttn = () => {
        logout(false);
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