import React from 'react';
import {Typography, TextField, Button, Box, useTheme} from '@mui/material';
import {ErrorMessage, Form, Formik} from 'formik';
import {styled} from '@mui/material/styles';
import {tokens} from "../../theme";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();



    const CustomTextField = styled(TextField)(() => ({
        '& label.Mui-focused': {
            color: `${colors.grey[100]}`,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: `${colors.grey[100]}`,
            },
            '&.Mui-focused fieldset': {
                borderColor: `${colors.grey[100]}`,
            },
        },
    }));

    const initialValues = {
        username: '',
        password: '',
    };

    const handleSubmit = async (values, actions) => {

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username: values.username,
                password: values.password,
            });

            if (response.data.user === null) {
                console.log("Уведомление о том, что либо пароль, либо логин неправильный")
            }
            else {
                localStorage.setItem('token',response.data.gwt);
                navigate("/profile");
            }

            actions.setSubmitting(false);
        } catch (error) {
            console.error('Error:', error);
            actions.setSubmitting(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="90vh"
        >
            <Typography variant="h2" align="center">
                Вход
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({values, handleChange, handleBlur, isSubmitting}) => (
                        <Form>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                label="Имя пользователя"
                                name="username"
                                margin="normal"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="username" component="div"/>

                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                label="Пароль"
                                name="password"
                                type="password"
                                margin="normal"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="password" component="div"/>

                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                disabled={isSubmitting}
                                style={{marginTop: '1rem'}}
                            >
                                Войти
                            </Button>
                        </Form>
                    )}
                </Formik>

            </Box>
            <Box marginTop="20px" align="center">
                <Typography>Нет аккаунта?</Typography>

                <Link to="/register" style={{textDecoration: "none"}}>
                    <Typography
                        variant="h5"
                        style={{cursor: "pointer"}}
                        color={colors.greenAccent[500]}
                    >
                        Зарегистрироваться
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
