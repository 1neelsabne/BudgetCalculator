// Importing Required Libraries and Components

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialButton from './SocialButton';

// Importing Libraries for Toasters

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React-Hook-Form
import { useForm, Controller } from 'react-hook-form';

// React yup library for validations
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';

// Creating Schema for the Validations

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8).max(16).required('Password is required')
});

// Functional for Copyright

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Neel Sabne
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

// Functional Component for SignIn

export default function SignInSide() {

    // Package for Encryption and Decryption

    const bcrypt = require('bcryptjs')

    // Declaring useForm hook

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    // Declaring States For Holding Data

    const [userdata, setUserdata] = useState([]);

    // Declaring navigate to redirect
    const navigate = useNavigate();

    // useEffect to get data from server

    useEffect(() => {
        const URL = "http://localhost:3001/users";
        axios.get(URL)
            .then(res => {
                setUserdata(res.data);
            })
    }, [])

    // Handling onSubmit Event with decryption and redirecting

    const onSubmit = (data, user) => {
        //var flag = false;
        if (data) {
            let getSearch = userdata.filter(item => (data.email === item.email && bcrypt.compareSync(data.password, item.pass)));
            if (getSearch.length > 0) {
                toast.success("Login Success!", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "colored",
                })
                // alert("Done")
                setTimeout(() => {
                    navigate('/home')
                }, 3000);

            }
            else {
                toast.error("Credential does not match !", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "colored",
                })
            }
        }
        else {
            toast.error("Fields are Required !", {
                position: "top-left",
                autoClose: 5000,
                theme: "colored",
            })
        }
    }

    // Handling Social Login and redirecting

    const handleSocialLogin = (user) => {
        if (user) {
            toast.success("Login Success!", {
                position: "top-left",
                autoClose: 5000,
                theme: "colored",
            })
            // alert("Done")
            setTimeout(() => {
                navigate('/home')
            }, 3000);
        }
    };

    // Handling Social Login Errors

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    // Returning Desining part of Web Page

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1636013207944-355b138df069?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1964&q=80)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 5,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <h2>Welcome Back!</h2>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} >
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        label="Email Address"
                                        margin="normal"
                                        fullWidth
                                        type="email"
                                        autoComplete="email"
                                        autoFocus
                                        helperText={errors.email?.message}

                                    />}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        label="Password"
                                        margin="normal"
                                        fullWidth
                                        type="password"
                                        autoComplete="current-password"
                                        autoFocus
                                        helperText={errors.password?.message}

                                    />}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="success" required />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => reset()}
                                    type="reset"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                    color="error"
                                >
                                    Reset
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <SocialButton
                                            provider="facebook"
                                            appId="460751412227720"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                            variant="primary"
                                            size="lg"
                                        >
                                            <i class="fa fa-facebook"></i>  Facebook
                                        </SocialButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SocialButton
                                            provider="google"
                                            appId="887747976013-n421fi8sbvc4roqdgrv6kdsiugpr4ivd.apps.googleusercontent.com"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                            variant="danger"
                                            size="lg"
                                        >
                                            <i class="fa fa-google"></i>  Gmail
                                        </SocialButton>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
                <ToastContainer newestOnTop />
            </ThemeProvider>

        </>
    );
}