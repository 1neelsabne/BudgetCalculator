// Importing Required Libraries and Components

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React-Hook-Form

import { useForm, Controller } from 'react-hook-form';

// React yup library for validations

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Importing Recaptha Library

const Recaptcha = require('react-recaptcha');

// Inporting Encryption and Decryption Libraries
const bcrypt = require('bcryptjs')

// Creating Schema for Validations using yup library

const LoginSchema = Yup.object().shape({
    fname: Yup.string().min(2).required('First Name is required'),
    lname: Yup.string().min(2).required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8).max(16).required('Password is required')
});

// Function for Copyright

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

// Functional Component for Sighup

export default function SignUp() {

    // Declaring States for Holding data

    const [captcha, setCaptcha] = useState(false);

    // Declaring useForm hook with resolver

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    // Handling onSubmit Event with Encryption and posting data to the server

    const onSubmit = (data) => {
        if (data && captcha) {
            const pass = data.password;

            console.warn(pass);

            const hashPass = bcrypt.hashSync(pass, bcrypt.genSaltSync());

            const userData = { fname: data.fname, lname: data.lname, email: data.email, pass: hashPass }
            const URL = "http://localhost:3001/users";
            axios.post(URL, userData)
                .then(res => {
                    if (res) {
                        toast.success("Registered Successfully!", {
                            position: "top-left",
                            autoClose: 5000,
                            theme: "colored",
                        })
                    }
                })

            // const doesPasswordMatch = bcrypt.compareSync(pass, hashPass)

            // console.warn(doesPasswordMatch);

        }
    }

    // Recaptha functions for getting unique key

    var callback = () => {
        console.log('Done!!!!');
    }

    var verifyCallback = (response) => {
        console.log(response);
        setCaptcha(true)
    }

    // Retuning Designing part of Web Page

    return (
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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="fname"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <TextField
                                            {...field}
                                            label="First Name"
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            autoComplete="text"
                                            autoFocus
                                            helperText={errors.fname?.message}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="lname"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <TextField
                                            {...field}
                                            label="Last Name"
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            autoComplete="text"
                                            autoFocus
                                            helperText={errors.lname?.message}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
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
                                            autoFocus
                                            helperText={errors.password?.message}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Recaptcha
                                        sitekey="6Lc8zBsdAAAAAMfbf_dr4KtSMrXAiGzP6a5DdaB8"
                                        onloadCallback={callback}
                                        verifyCallback={verifyCallback}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
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
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 2 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer newestOnTop />
        </ThemeProvider>
    );
}