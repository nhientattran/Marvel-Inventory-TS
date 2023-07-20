// External Imports
import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Internal Imports
import car_image from '../../assets/Images/marvel_background.jpg';

interface Props {
    title: string
}

const Root = styled('div')({
    padding: 0,
    margin: 0
})

const NavBarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled('h1')({
    margin: '0 0 0 0.45em',
})

const LogoA = styled(Link)({
    color: 'black',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})

const LogoNavigation = styled('ul')({
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.7)),url(${car_image})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute'
})

const MainText = styled('div')({
    textAlign: 'center',
    // margin: '2px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})


export const Home = (props:Props) => {
    const myAuth = localStorage.getItem('myAuth')
    return (
        <Root>
            <Typography>
                <NavBarContainer>
                    <Logo>
                        <LogoA to="/">Characters</LogoA>
                    </Logo>
                    <LogoNavigation>
                        <li>
                            <NavA to="/">Home</NavA>
                        </li>
                        {myAuth === 'true' ?
                        <><li>
                            <NavA to="/dashboard">Dashboard</NavA>
                        </li><li>
                            <NavA to='/signin'>Sign Out</NavA>
                        </li></>
                        :
                        <><li>
                            <NavA to="/signin">Sign In</NavA>
                        </li>
                        <li>
                            <NavA to="/signup">Sign Up</NavA>
                        </li></>
                        }

                    </LogoNavigation>

                </NavBarContainer>
                <Main>
                    <MainText>
                        <h1>{props.title}</h1>
                        <p>Welcome to our Marvel Characters Inventory!</p>
                        <Button color='primary' variant='contained' component={Link} to='/dashboard'>See the Characters</Button>
                    </MainText>
                </Main>
            </Typography>
        </Root>
    )
}