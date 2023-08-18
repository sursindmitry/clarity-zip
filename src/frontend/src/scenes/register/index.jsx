import React from 'react';
import {Typography, TextField, Button, Box, useTheme} from '@mui/material';
import {Formik} from 'formik';
import {styled} from '@mui/material/styles';
import {tokens} from "../../theme";
import axios from "axios";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

const checkoutSchema = yup.object().shape({
    username: yup
        .string().required("Обязательно")
        .min(3, "Логин должен содержать минимум 3 символа")
        .matches(/^\w+$/, "Логин не должен содержать специальные символы")
        .notOneOf(['admin', 'superuser'], "Этот логин зарезервирован")
        .min(3, "Логин должен содержать не менее 3 символов")
        .max(20, "Логин не должен превышать 20 символов")
        .test("no-spaces", "Логин не должен содержать пробелы", (value) => {
            return value === undefined || value.trim() === value;
        }),
    password: yup
        .string().required("Обязательно")
        .oneOf([yup.ref('confirmPassword'),null],"Пароли должны совпадать")
        .min(8, "Пароль должен содержать не меннее 8 символов")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, "Пароль должен содержать буквы и цифры"),
    confirmPassword: yup
        .string().required("Обязательно")
        .oneOf([yup.ref('password'),null],"Пароли должны совпадать")
        .min(8, "Пароль должен содержать не меннее 8 символов")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, "Пароль должен содержать буквы и цифры")
});

const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
};
const Register = () => {
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


    const handleSubmit = async (values, actions) => {

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username: values.username,
                password: values.password
            });

            if (response === null) {
                console.log("Уведомление о том, что то пошло не так")
            }
            else {
                console.log("Уведомление о том, что пользователь создан")
                navigate("/login");
            }

            actions.setSubmitting(false);
        } catch (error) {
            console.error('Error:', error);
            actions.setSubmitting(false);
        }
    };

    return (
        <Box display="flex"
             flexDirection="column"
             justifyContent="center"
             alignItems="center"
             height="90vh"
        >
            <Typography variant="h2" align="center">
                Регистрация
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={checkoutSchema}
                >
                    {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <CustomTextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="Логин"
                                    name="username"
                                    margin="normal"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}
                                />
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
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                                <CustomTextField
                                    fullWidth
                                    variant="outlined"
                                    label="Пароль"
                                    name="confirmPassword"
                                    type="password"
                                    margin="normal"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />
                            </Box>
                            <Box marginTop="20px" align="center">
                                <Button type="contained" color="secondary" variant="contained">
                                    Создать аккаунт
                                </Button>
                            </Box>
                        </form>

                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Register;
