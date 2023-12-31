import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import Invoices from "./scenes/invoices"
import Contacts from "./scenes/contacts"
import Bar from "./scenes/bar"
import Form from "./scenes/form"
import Line from "./scenes/line"
import Pie from "./scenes/pie"
import FAQ from "./scenes/faq"
import Geography from "./scenes/geography"
import Calendar from "./scenes/calendar"
import {Routes, Route} from "react-router-dom";
import Photo from "./scenes/compressed/photo"
import Login from "./scenes/login";
import Register from "./scenes/register";
import Profile from "./scenes/profile";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {AuthProvider} from "./components/AuthProvider";

function App() {
    const [theme, colorMode] = useMode();

    return (<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AuthProvider>
                    <div className="app">
                        <Sidebar/>
                        <main className="content">
                            <TopBar/>
                            <NotificationContainer/>
                            <Routes>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/compressed/photo" element={<Photo/>}/>
                                <Route path="/contacts" element={<Contacts/>}/>
                                <Route path="/invoices" element={<Invoices/>}/>
                                <Route path="/form" element={<Form/>}/>
                                <Route path="/bar" element={<Bar/>}/>
                                <Route path="/pie" element={<Pie/>}/>
                                <Route path="/line" element={<Line/>}/>
                                <Route path="/faq" element={<FAQ/>}/>
                                <Route path="/geography" element={<Geography/>}/>
                                <Route path="/calendar" element={<Calendar/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                            </Routes>
                        </main>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
