import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';

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
let listStyle = {
    fontSize: '20pt',
    width: '100%',
    backgroundColor: 'beige',
    marginBottom: '1%',
    borderRadius: '10px',
    border: 'solid 1px',
    height: '90px',
}
let pubStyle = {
    fontSize: '20pt',
    width: '100%',
    backgroundColor: 'lavender',
    marginBottom: '1%',
    borderRadius: '10px',
    border: 'solid 1px',
    height: '90px',
}

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
    const [expand, setExpand] = useState(<div>
        <div id='list-bottom'>
            <div className='list-left'>
                <Box style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={(event) => {
                        handleLoadList(event, idNamePair._id)
                    }}> Edit </Box>
            </div>
            <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                    <IconButton onClick={(event) => { handleExpandView(event, idNamePair._id) }}>
                        <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                    </IconButton>
                </Box>
            </div>
        </div>
    </div>);

    const [expandPub, setPub] = useState(<div>
        <div id='list-bottom'>
            <div className='list-left'>
                Published: <span style={{ color: 'green' }}>{idNamePair.pubDate}</span>
            </div>
            <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
                <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                    <IconButton onClick={(event) => { handleExpandPub(event, idNamePair._id) }}>
                        <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                    </IconButton>
                </Box>
            </div>
        </div>
    </div>);

    const [dislikeBox, setDislike] = useState(
        <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleDislike(event, idNamePair._id) }}>
                <ThumbDownOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.dislikes}</span>
        </Box>);

    const [likeBox, setLike] = useState(
        <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleLike(event, idNamePair._id) }}>
                <ThumbUpOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.likes}</span>
        </Box>);

    const [open, setOpen] = useState(false);
    const [liked, toggleLike] = useState(false);
    const [disliked, toggleDislike] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleLoadList(event, id) {
        closeView();
        closeViewPub()
        store.setCurrentList(id);
    }

    function handleDislike(event, id) {
        let box = <Box></Box>;
        if(!disliked){
        box = <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleDislike(event, idNamePair._id) }}>
                <ThumbDownIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.dislikes}</span>
        </Box>
        }else{
            box = <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleDislike(event, idNamePair._id) }}>
                <ThumbDownOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.dislikes}</span>
        </Box>
        }
        event.stopPropagation();
        store.dislike(id);
        toggleDislike(!disliked);
        setDislike(box)
    }
    function handleLike(event, id) {
        let box = <Box></Box>;
        if(!liked){
            box = <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleLike(event, idNamePair._id) }}>
                <ThumbUpIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.likes}</span>
        </Box>
        }else{
            box = <Box style={{ display: 'inline', padding: '8px' }}>
            <IconButton onClick={(event) => { handleLike(event, idNamePair._id) }}>
                <ThumbUpOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
            </IconButton>
            <span>{idNamePair.likes}</span>
        </Box>
        }
        event.stopPropagation();
        store.like(id);
        toggleLike(!liked);
        setLike(box);
    }

    ////////////////////////////////////////////////EDIT CARD////////////////////////////////////////////
    function handleExpandView(event, id) {
        event.stopPropagation();
        store.updateViewing(id);
        handleExpand(event);
    }
    function handleExpand(event) {
        event.stopPropagation();
        let list = store.viewingList; //null???
        // console.log(list)
        listStyle = {
            fontSize: '20pt',
            width: '100%',
            backgroundColor: 'beige',
            marginBottom: '1%',
            borderRadius: '10px',
            border: 'solid 1px',
            height: 'fit-content',
        }
        setExpand(<div style={{ marginTop: '5%', marginBottom: '3%', width: '100%' }}><List>
            <Box className='view-left'>
                <ListItem>
                    1. 
                </ListItem>
                <ListItem>
                    2.
                </ListItem>
                <ListItem>
                    3.
                </ListItem>
                <ListItem>
                    4.
                </ListItem>
                <ListItem>
                    5.
                </ListItem>
            </Box>
            <Box className='view-right'>

            </Box>
        </List>
            <div id='list-bottom'>
                <div className='list-left'>
                    <Box style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={(event) => {
                            handleLoadList(event, idNamePair._id)
                        }}> Edit </Box>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                        <IconButton onClick={closeView}>
                            <ArrowDropUpIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>);

    }
    function closeView() {
        listStyle = {
            fontSize: '20pt',
            width: '100%',
            backgroundColor: 'beige',
            marginBottom: '1%',
            borderRadius: '10px',
            border: 'solid 1px',
            height: '90px'
        }
        setExpand(<div>
            <div id='list-bottom'>
                <div className='list-left'>
                    <Box style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={(event) => {
                            handleLoadList(event, idNamePair._id)
                        }}> Edit </Box>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                        <IconButton onClick={(event) => { handleExpandView(event, idNamePair._id) }}>
                            <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>);
    }
    ////////////////////////////////////////////////PUB CARD////////////////////////////////////////////
    function handleExpandPub(event, id) {
        event.stopPropagation();
        store.updateViewing(id);
        handlePub(event);
    }
    function handlePub(event) {
        event.stopPropagation();
        let list = store.viewingList;
        // console.log(list)
        pubStyle = {
            fontSize: '20pt',
            width: '100%',
            backgroundColor: 'lavender',
            marginBottom: '1%',
            borderRadius: '10px',
            border: 'solid 1px',
            height: 'fit-content',
        }
        setPub(<div style={{ marginTop: '5%', marginBottom: '3%', width: '100%' }}><List>
            <Box className='view-left'>
                <ListItem>
                    1.
                </ListItem>
                <ListItem>
                    2.
                </ListItem>
                <ListItem>
                    3.
                </ListItem>
                <ListItem>
                    4.
                </ListItem>
                <ListItem>
                    5.
                </ListItem>
            </Box>
            <Box className='view-right'>

            </Box>
        </List>
            <div id='list-bottom'>
                <div className='list-left'>
                    Published: <span style={{ color: 'green' }}>{idNamePair.pubDate}</span>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
                    <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                        <IconButton onClick={closeViewPub}>
                            <ArrowDropUpIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>);

    }
    function closeViewPub() {
        pubStyle = {
            fontSize: '20pt',
            width: '100%',
            backgroundColor: 'lavender',
            marginBottom: '1%',
            borderRadius: '10px',
            border: 'solid 1px',
            height: '90px'
        }
        setPub(<div>
            <div id='list-bottom'>
                <div className='list-left'>
                    Published: <span style={{ color: 'green' }}>{idNamePair.pubDate}</span>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
                    <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                        <IconButton onClick={(event) => { handleExpandPub(event, idNamePair._id) }}>
                            <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////

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

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ display: 'flex', p: 1 }}
            style={listStyle}>
            <div id='list-top'>
                <div className="list-left">
                    <Box
                    >{idNamePair.name}
                        <div id='list-owner'>By: <Link style={{ color: 'blue' }}>{idNamePair.ownerName}</Link> </div>
                    </Box>
                </div>
                <div id="list-right" style={{ display: 'inline' }}>
                    <Box style={{ display: 'inline', padding: '8px', float: 'right', marginTop: '-4%' }}
                        onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                        <IconButton>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
            {expand}
        </ListItem>

    if (idNamePair.published) {
        cardElement = <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ display: 'flex', p: 1 }}
            style={pubStyle}>
            <div id='list-top'>
                <div className="list-left">
                    <Box
                    >{idNamePair.name}
                        <div id='list-owner'>By: <Link style={{ color: 'blue' }}>{idNamePair.ownerName}</Link> </div>
                    </Box>
                </div>
                <div id="list-right" style={{ display: 'inline' }}>
                    {likeBox}
                    {dislikeBox}
                    <Box style={{ display: 'inline', padding: '8px', float: 'right', marginTop: '-5%' }}
                        onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                        <IconButton>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
            {expandPub}
        </ListItem>
    }

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
    if (store.listMarkedForDeletion) {
        modal = <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{ textAlign: 'center' }}>
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