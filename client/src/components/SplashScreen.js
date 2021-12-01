import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SortIcon from '@mui/icons-material/Sort';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div id='title'>Welcome to The Top 5 Lister!</div>
            <div id='subtitle'>Created by Jenny Fu ft. McKilla Gorilla</div>
            <div class='info-banner'>
                <div class='banner-text'>Interact With User Owned Lists!</div>
                <LocalLibraryIcon class='banner-icon'/>
            </div>
            <div class='info-banner'>
                <div class='banner-text'>Create Your Own Lists!</div>
                <SortIcon class='banner-icon'/>
            </div>
            <div class='info-banner'>
                <div class='banner-text'>Build a Community!</div>
                <ConnectWithoutContactIcon class='banner-icon'/>
            </div>
            <div class='title-buttons'>
                
            </div>
        </div>
    )
}