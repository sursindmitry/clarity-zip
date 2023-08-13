import {Box, IconButton, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";
import {tokens} from "../../theme";


const Login = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box m="20px">
            <Header title="Login page" subtitle="Login"/>
        </Box>
    )
}
export default Login;