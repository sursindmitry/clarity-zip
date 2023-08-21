import { useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MovieIcon from '@mui/icons-material/Movie';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import {Link} from "react-router-dom";
import {useAuth} from "../../components/AuthProvider";


const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const {tokenExists} = useAuth();

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },

                "& .pro-sidebar-layout": {
                    "&::-webkit-scrollbar-thumb": {
                        background: `${colors.grey[100]}`,
                        overflowY: "auto",
                        borderRadius: "3px"

                    },
                    "&::-webkit-scrollbar": {
                        width: "6px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: colors.grey[900]
                    },
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item-active": {
                    color: "#6870fa !important"
                }

            }}>
            <ProSidebar collapsed={isCollapsed} collapsedWidth="100px">
                <Menu iconShape="squre">
                    <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}
                              icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                              style={{
                                  margin: "10px 0 20px 0",
                                  color: colors.grey[100]
                              }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>ClarityZip</Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {(!isCollapsed && !tokenExists) && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/avatar.png`}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold"
                                            sx={{margin: "10px 0 0 0"}}>Вы не вошли</Typography>
                                <Typography
                                    variant="h5"
                                    style={{cursor: "pointer"}}
                                    color={colors.greenAccent[500]}
                                >
                                    <Item
                                        title="Войти"
                                        to="/login"
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {(!isCollapsed && tokenExists  ) && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/avatar.png`}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold"
                                            sx={{margin: "10px 0 0 0"}}>Вы вошли</Typography>
                                <Typography
                                    variant="h5"
                                    style={{cursor: "pointer"}}
                                    color={colors.greenAccent[500]}
                                >
                                    <Item
                                        title="Профиль"
                                        to="/profile"
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Главная"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Сжать
                        </Typography>
                        <Item
                            title="Фото"
                            to="/compressed/photo"
                            icon={<CameraAltIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Видео"
                            to="/compressed/video"
                            icon={<MovieIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="PDF-файл"
                            to="/compressed/pdf"
                            icon={<PictureAsPdfIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Contacts Information"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Сохранить
                        </Typography>
                        <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Разное
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography Chart"
                            to="/geography"
                            icon={<MapOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;