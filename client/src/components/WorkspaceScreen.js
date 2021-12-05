import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js';
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
const modalStyle = { //modal style
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(store.currentList.name);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let listItems = store.currentList.items;
    let disabled = false;
    let name = "";
    let style={color:'black', backgroundColor:'lightgrey', border:'solid 1px', borderRadius: '10px'};

    function updateList(){
        if(title === '') handleOpen();
        else store.changeList(title, listItems, false);
    }
    function publishList(){
        let pub = true;
        for(let i = 0; i < 5; i++){
            if(listItems[i] === ""){
                pub = false;
            }
        }

        if(title === '' || !pub) handleOpen();
        else store.changeList(title, listItems, true);
    }
    function handleSetTitle(e){
        setTitle(e.target.value);
    }
    function updateItems(index, value){
        listItems[index] = value;
    }
    //check when list loads
        // for(let i = 0; i < 5; i++){
        //     if(listItems[i] === ""){
        //         disabled = true;
        //         name = "disabled";
        //         style = {};
        //         break;
        //     }
        // }

    let editItems = "";
    if (store.currentList) {
        editItems =
            <List id="edit-items">
                {/* <div id="edit-box"> */}
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item
                            key={'top5-item-' + (index + 1)}
                            text={item}
                            index={index}
                            updateItems={updateItems}
                        />
                    ))
                }
                {/* </div> */}
            </List>;
    }

    let modal = <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={modalStyle} style={{textAlign:'center'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Title/item information is missing!
                </Typography>
                <Button variant="outlined" onClick={handleClose}>Confirm</Button>
            </Box>
        </Modal>

    return (
        <div>
            <EditToolbar />
            <div id="top5-workspace">
                <TextField
                    value={title}
                    style={{ width: '400px', marginLeft: '1.5%', marginTop: '1%', backgroundColor:'white', borderRadius:'4px' }}
                    inputProps={{ style: { height: "10px", fontSize: '15px'} }}
                    required
                    id="title"
                    // label="Title"
                    name="title"
                    autoComplete="Title"
                    autoFocus
                    onChange={handleSetTitle}
                />
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h5">1.</Typography></div>
                        <div className="item-number"><Typography variant="h5">2.</Typography></div>
                        <div className="item-number"><Typography variant="h5">3.</Typography></div>
                        <div className="item-number"><Typography variant="h5">4.</Typography></div>
                        <div className="item-number"><Typography variant="h5">5.</Typography></div>
                    </div>
                    {editItems}
                </div>
            </div>
            {/* <Statusbar /> */}
            <div id="top5-statusbar" className='disabled'>
                <div id="list-selector-heading">
                    <Button
                        color="primary"
                        aria-label="add"
                        id="add-list-button"
                    // disabled={disabled}
                    >
                        <AddIcon style={{color:'grey'}} />
                    </Button>
                    <Typography variant="h4">Your Lists</Typography>
                </div>
            </div>
            <div id='edit-buttons'>
                <Button style={{color:'black', backgroundColor:'lightgrey', border:'solid 1px', borderRadius: '10px', marginRight:'20px'}} 
                    onClick={updateList}>
                    Save
                </Button>
                <Button style={style} disabled={disabled} className={name} onClick={publishList}>
                    Publish 
                </Button>
            </div>
            {modal}
        </div>
    )
}

export default WorkspaceScreen;