import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import TextField from '@mui/material/TextField';
// import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    // const [homeSelected, setHome] = useState(true);
    // const [allSelected, setAll] = useState(false);
    // const [userSelected, setUser] = useState(false);
    // const [communitySelected, setCommunity] = useState(false);
    const [text, setText] = useState('');//search bar results
    // const [link, setLink] = useState('/');
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    let name = '';
    let guest = auth.guestLogin;
    let home = '';
    let disabled = false;
    let searchDisabled = '';
    if (store.currentList) {
        disabled = true;
        name = 'disabled';
        guest = true;
        home = 'disabled';
        searchDisabled = 'search-disable';
    }
    if(guest){
        home = 'disabled';
    }

    const openSortMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={() => handleSort("newest")}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={() => handleSort("oldest")}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={() => handleSort("views")}>Views</MenuItem>
            <MenuItem onClick={() => handleSort("likes")}>Likes</MenuItem>
            <MenuItem onClick={() => handleSort("dislikes")}>Dislikes</MenuItem>
        </Menu>
    );

    function handleSort(sort) {
        // props.sortBy(sort);
        store.sortBy(sort);
        handleMenuClose();
    }

    function toggleHome() {
        // setHome(true);
        // setAll(false);
        // setUser(false);
        // setCommunity(false);
        store.setOption('home');
        // setLink('/');
    }
    function toggleAll() {
        // setAll(true);
        // setHome(false);
        // setUser(false);
        // setCommunity(false);
        store.setOption('all');
        // setLink('/allLists');
    }
    function toggleUser() {
        // setUser(true);
        // setHome(false);
        // setAll(false);
        // setCommunity(false);
        store.setOption('user');
        // setLink('/userLists');
    }
    function toggleCommunity() {
        // setCommunity(true);
        // setHome(false);
        // setAll(false);
        // setUser(false);
        store.setOption('community');
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.searchBy(text);
        }
    }
    
    return (
        <div id="edit-toolbar">
            <Button disabled={guest} onClick={toggleHome}>
                <HomeOutlinedIcon id={store.home ? 'button-selected' : ''} className={home} style={{ height: '40px', width: '50px', color: 'black' }} />
            </Button>
            <Button disabled={disabled} onClick={toggleAll}>
                <GroupsOutlinedIcon id={store.all ? 'button-selected' : ''} className={name} style={{ height: '40px', width: '50px', color: 'black' }} />
            </Button>
            <Button disabled={disabled} onClick={toggleUser}>
                <PersonOutlinedIcon id={store.user ? 'button-selected' : ''} className={name} style={{ height: '40px', width: '50px', color: 'black' }} />
            </Button>
            <Button disabled={disabled} onClick={toggleCommunity}>
                <FunctionsOutlinedIcon id={store.community ? 'button-selected' : ''} className={name} style={{ height: '40px', width: '50px', color: 'black' }} />
            </Button>
            <TextField className={searchDisabled}
                style={{ width: '500px', marginRight: '19%', marginTop: '0.7%', backgroundColor: 'white', borderRadius: '4px' }}
                inputProps={{ style: { height: "10px", fontSize: '15px' } }}
                id="search"
                label="Search"
                name="search"
                autoComplete="search"
                onChange={handleUpdateText}
                onKeyPress={handleKeyPress}
            />
            <div style={{ float: 'right' }}>
                Sort By
                <Button disabled={disabled} onClick={openSortMenu}>
                    <SortOutlinedIcon className={name} style={{ height: '45px', width: '50px', color: 'black' }} />
                </Button>
            </div>
            {menu}
        </div>
    )
}

export default EditToolbar;