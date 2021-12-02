import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import TextField from '@mui/material/TextField';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    
    let disabledRedo = true;
    let disabledUndo = true;
    let disabled = true;

    if(store.currentList && store.canUndo()) disabledUndo = false;
    if(store.currentList && store.canRedo()) disabledRedo = false;
    if(store.currentList) {disabled = false;}
    
    if(store.isItemEdit()) {disabledUndo = true; disabledRedo = true; disabled = true;}
    
    return (
        <div id="edit-toolbar">
            <Button>
                <HomeOutlinedIcon style={{height: '40px', width : '50px', color:'black'}} />
            </Button>
            <Button>
                <GroupsOutlinedIcon style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <Button>
                <PersonOutlinedIcon style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <Button>
                <FunctionsOutlinedIcon style={{height: '40px', width : '50px', color:'black'}}/>
            </Button>
            <TextField
                style={{width : '500px', marginRight: '19%', marginTop:'0.2%'}}
                // margin="normal"
                // required
                id="search"
                label="Search"
                name="search"
                autoComplete="search"
                // autoFocus
                />
            <Button style={{height: '40px', width : '100px', color:'black'}}>
                Sort By
            </Button>
            <Button>
                <SortOutlinedIcon style={{height: '45px', width : '50px', color:'black'}}/>
            </Button>
        </div>
    )
}

export default EditToolbar;