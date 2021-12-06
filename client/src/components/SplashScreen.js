import { useContext } from 'react';
import AuthContext from '../auth'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SortIcon from '@mui/icons-material/Sort';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    function handleGuestLogin(){
        auth.loginGuest();
    }

    return (
        <div id="splash-screen">
            <div id='title'>Welcome to The Top 5 Lister!</div>
            <div id='subtitle'>Created by Jenny Fu ft. McKilla Gorilla</div>
            <div className='info-banner'>
                <div className='banner-text'>Interact With User Owned Lists!</div>
                <LocalLibraryIcon class='banner-icon'/>
            </div>
            <div className='info-banner'>
                <div className='banner-text'>Create Your Own Lists!</div>
                <SortIcon class='banner-icon'/>
            </div>
            <div className='info-banner'>
                <div className='banner-text'>Build a Community!</div>
                <ConnectWithoutContactIcon class='banner-icon'/>
            </div>
            <div className='title-buttons'>
                <Button id='login-button' ><Link to='/login/'> Login </Link></Button>
                <Button id='create-button' ><Link to='/register/'> Create Account </Link> </Button>
            </div>
            <div id='guest-box'>
                <Box id='guest-button' onClick={handleGuestLogin}>
                    or continue as guest...
                </Box>
            </div>
        </div>
    )
}