import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';

// I import GitHubIcon to get the Icon picture of Github
import GitHubIcon from '@mui/icons-material/GitHub';

// Import the useSignInWithGithub, GithubAuthProvider to make authentication by Github

import { useAuthState, useSignInWithGoogle, useSignInWithGithub } from 'react-firebase-hooks/auth'; 
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GithubAuthProvider,
} from 'firebase/auth'; 
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { styled } from '@mui/system'; 
import { SubmitHandler, useForm } from 'react-hook-form';

// Internal Import
import { Input, InputPassword } from '../sharedComponents'; 

const signinStyles = {
    googleButton: {
        backgroundColor: 'rgb(66, 133, 244)',
        margin: '2em',
        padding: 0,
        color: 'white',
        height: '50px', 
        width: '250px',
        border: 'none', 
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '10px',
        fontFamily: 'cursive',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'cursive',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backGroundColor: '#4caf50'
    }
}

const NavA = styled(Link)({
    display: 'block',
    color: 'black',
    fonFamily: 'cursive',
    marginBottom: '20px'
})

// Functional component to be used inside Sign In to add Alert features
const Alert = (props: AlertProps) => {
    return (<MUIAlert elevation={6} variant='filled' />)
}

interface ButtonProps {
    open?: boolean
    onClick?: () => void 
};

// Create Github Icon to let user sign in with Github
export const GithubIcon = (props: ButtonProps) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [ signInWithGitHub, user, loading, error ] = useSignInWithGithub(auth)

    const signIn = async() => {
        await signInWithGitHub()
        console.log(auth)
        if (auth.currentUser) {
            localStorage.setItem('myAuth', 'true')
            navigate('/dashboard')
        } else {
            navigate('/signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUsOut = async () => {
        await signOut(auth)

        localStorage.setItem('myAuth', 'false')
        navigate('/')
    }

    if (loading) {
        return (<CircularProgress />)
    }

    const myAuth = localStorage.getItem('myAuth')

    // instead of the button, i think the github icon looks better so I used what we did in home.tsx about if {myAuth === 'true'} will return the html element
    return (
        <div>
            {myAuth === 'true' ? 
            <>
                <div></div>
            </>
            : 
            <>
                <div onClick={signIn} style={{cursor: 'pointer'}}>
                    <GitHubIcon sx={{fontSize: '60px', textAlign: 'center'}}/>
                    <Typography>Sign In With GitHub</Typography>
                </div>
            </>
            }
        </div>
    )
}


export const GoogleButton = (props: ButtonProps) => {
    const navigate = useNavigate();
    const auth = getAuth(); 
    const [ signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth)

    const signIn = async () => {
        await signInWithGoogle()
        console.log(auth)
        if (auth.currentUser) {
            localStorage.setItem('myAuth', 'true')
            navigate('/dashboard')
        } else {
            navigate('/signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUsOut = async () => {
        await signOut(auth)

        localStorage.setItem('myAuth', 'false')
        navigate('/')
    }

    if (loading){
        return (<CircularProgress />) 
    }

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true') {
        return (
            <Button variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <Button sx={ signinStyles.googleButton } onClick={signIn}>Sign In With Google</Button>
        )
    }
}

interface UserProps {
    email: string,
    password: string
}

export const SignIn = () => {
    const [open, setOpen] = useState(false)
    const [ alertOpen, setAlertOpen ] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClosed = () => {
        setOpen(false)
        setAlertOpen(true)
    }

    const navToDash = () => {
        navigate('/dashboard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password)


        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user;
                navigate('/dashboard')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });


    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <InputPassword {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            <NavA to='/signup'>Don't Have an account? Register Now!</NavA>
            <GoogleButton open={open} onClick={handleSnackClosed} />
            <GithubIcon open={open} onClick={handleSnackClosed} />
            <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
                <div>
                    <Alert severity='success'>
                        <AlertTitle>Successful Sign In -- Redirect in 3 seconds</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    )      
}

export const SignUp = () => {
    const [open, setOpen] = useState(false)
    const [ alertOpen, setAlertOpen ] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClosed = () => {
        setOpen(false)
        setAlertOpen(true)
    }

    const navToDash = () => {
        navigate('/dashboard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password)


        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/signin')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });


    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign Up Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <InputPassword {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
                <div>
                    <Alert severity='success'>
                        <AlertTitle>Successful Sign Up -- Redirect in 3 seconds</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    )      
}