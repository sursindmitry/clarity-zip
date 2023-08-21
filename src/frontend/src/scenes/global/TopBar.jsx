import React, {useContext, useState} from "react";
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ColorModeContext,
    tokens,
} from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";
import {useAuth} from "../../components/AuthProvider";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const {tokenExists, logout} = useAuth();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };
    const handleMenuExit = () => {
        logout(false);
    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
                <IconButton type="button" sx={{p: 1}}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                {tokenExists && (
                    <Box>
                        <IconButton onClick={handleMenuOpen}>
                            <PersonOutlinedIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/profile" style={{textDecoration: "none"}}>
                                    <Typography
                                        variant="h5"
                                        style={{cursor: "pointer"}}
                                        color={colors.greenAccent[500]}
                                    >
                                        Профиль
                                    </Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuExit}>Выйти</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TopBar;
