import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    let name = '';
    let disabled = false;
    let searchDisabled = '';
    if(store.currentList){
        disabled = true;
        name = 'disabled';
        searchDisabled = 'search-disable';
    }

    return (
        <div id="edit-toolbar">
            <Button disabled={disabled}>
                <Link to='/'>
                    <HomeOutlinedIcon className={name} style={{height: '40px', width : '50px', color:'black'}}/>
                </Link>
            </Button>
            <Button disabled={disabled}>
                <GroupsOutlinedIcon className={name} style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <Button disabled={disabled}>
                <PersonOutlinedIcon className={name} style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <Button disabled={disabled}>
                <FunctionsOutlinedIcon className={name} style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <TextField  className={searchDisabled}
                style={{width : '500px', marginRight: '19%', marginTop:'1%', backgroundColor:'white', borderRadius:'4px'}}
                inputProps={{ style: { height: "10px", fontSize:'15px' }}}
                // margin="normal"
                // required
                id="search"
                label="Search"
                name="search"
                autoComplete="search" />
            <Button className={name} style={{height: '40px', width : '100px', color:'black'}} disabled={disabled}>
                Sort By
            </Button>
            <Button disabled={disabled}>
                <SortOutlinedIcon className={name} style={{height: '45px', width : '50px', color:'black'}}/>
            </Button>
        </div>
    )
}

export default EditToolbar;