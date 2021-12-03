import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = { //modal style
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    // const [editActive, setEditActive] = useState(false);
    // const [text, setText] = useState("");
    const { idNamePair } = props;


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    // function handleToggleEdit(event) {
    //     event.stopPropagation();
    //     toggleEdit();
    // }

    // function toggleEdit() {
    //     let newActive = !editActive;
    //     // if (newActive) {
    //         store.setIsListNameEditActive(newActive);
    //     // }
    //     setEditActive(newActive);
    // }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
        handleOpen();
    }

    async function deleteList(event) {
        event.stopPropagation();
        store.deleteList(store.listMarkedForDeletion);
        handleClose();
    }

    // function handleKeyPress(event) {
    //     if (event.code === "Enter") {
    //         let id = event.target.id.substring("list-".length);
    //         store.changeListName(id, text);
    //         toggleEdit();
    //     }
    // }
    // function handleUpdateText(event) {
    //     setText(event.target.value);
    // }
    let background='beige';

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', p: 1 }}
            style={{
                fontSize: '20pt',
                width: '100%',
                backgroundColor: background,
                marginBottom:'1%',
                borderRadius:'10px',
                border:'solid 1px',
            }}
        >
        {/* <Box id='list-top' sx={{flexGrow: 1, width:'100%'}}> */}
            <Box sx={{ p: 1, flexGrow: 1 }}
                // onClick={(event) => {
                //     handleLoadList(event, idNamePair._id)
                // }
                // }
                >{idNamePair.name}
            </Box>

            <Box>
                <IconButton>
                    <ThumbUpOutlinedIcon style={{ fontSize: '20pt' }} />
                </IconButton>
            </Box>
            <Box>
                <IconButton>
                    <ThumbDownOutlinedIcon style={{ fontSize: '20pt' }} />
                </IconButton>
            </Box>
            
            <Box>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteOutlineOutlinedIcon style={{ fontSize: '20pt' }} />
                </IconButton>
            </Box>
        {/* </Box>
        <Box id='list-bottom' sx={{flexGrow: 1, width:'100%'}}> */}
            <Box>
                <IconButton>
                    <ArrowDropDownIcon style={{ fontSize: '20pt' }} />
                </IconButton>
            </Box>
        {/* </Box> */}
        </ListItem>

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + idNamePair._id}
    //             label="Top 5 List Name"
    //             name="name"
    //             autoComplete="Top 5 List Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             defaultValue={idNamePair.name}
    //             inputProps={{ style: { fontSize: 48 } }}
    //             InputLabelProps={{ style: { fontSize: 24 } }}
    //             autoFocus
    //         />
    // }
    let modal = <Box></Box>
    if(store.listMarkedForDeletion){
        modal = 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Delete Top 5 {store.listMarkedForDeletion.name} list?
                </Typography>
                <Button variant="outlined" onClick={deleteList}>Confirm</Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
    }
    return (
        <Box>
            {cardElement}{modal}
        </Box>
    );
}

export default ListCard;