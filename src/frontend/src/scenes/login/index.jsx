import React, {useState} from 'react';
import {Typography, TextField, Button, Box, useTheme} from '@mui/material';
import {ErrorMessage, Form, Formik} from 'formik';
import {styled} from '@mui/material/styles';
import {tokens} from "../../theme";
import {Link} from "react-router-dom";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const CustomTextField = styled(TextField)(({theme}) => ({
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

    const handleSubmit = (values, actions) => {
        // Здесь можно добавить логику для проверки аутентификации
        console.log('Submitted values:', values);
        actions.setSubmitting(false);
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
            <Box display="flex" justifyContent="center" alignItems="center">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({isSubmitting}) => (
                        <Form>
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                label="Имя пользователя"
                                name="username"
                                margin="normal"
                            />
                            <ErrorMessage name="username" component="div"/>

                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                label="Пароль"
                                name="password"
                                type="password"
                                margin="normal"
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

                <Link to="/register" style={{textDecoration:"none"}}>
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
