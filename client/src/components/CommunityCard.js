import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Link } from 'react-router-dom';
import * as React from 'react';

let listStyle = {
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
function CommunityCard(props) {
    const { store } = useContext(GlobalStoreContext);
    // const [editActive, setEditActive] = useState(false);
    // const [text, setText] = useState("");
    const { idNamePair } = props;
    const [expand, setExpand] = useState(<div>
        <div id='list-bottom'>
            <div className='list-left'>
                Updated: <span style={{ color: 'green' }}>{idNamePair.update}</span>
            </div>
            <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
                <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                    <IconButton onClick={(event) => { handleExpandView(event, idNamePair._id) }}>
                        <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                    </IconButton>
                </Box>
            </div>
        </div>
    </div>);

    function handleExpandView(event, id) {
        event.stopPropagation();
        store.updateViewing(id);
        handleExpand(event);
    }
    function handleExpand(event) {
        event.stopPropagation();
        let list = store.viewingList;
        listStyle = {
            fontSize: '20pt',
            width: '100%',
            backgroundColor: 'lavender',
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
                    Updated: <span style={{ color: 'green' }}>{idNamePair.update}</span>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
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
            backgroundColor: 'lavender',
            marginBottom: '1%',
            borderRadius: '10px',
            border: 'solid 1px',
            height: '90px'
        }
        setExpand(<div>
            <div id='list-bottom'>
                <div className='list-left'>
                    Updated: <span style={{ color: 'green' }}>{idNamePair.update}</span>
                </div>
                <div className="list-right" style={{ display: 'inline', padding: '8px' }}>
                    Views: <span style={{ color: 'red' }}> {idNamePair.views} </span>
                    <Box style={{ display: 'inline', marginTop: '-8%', float: 'right' }}>
                        <IconButton onClick={(event) => { handleExpandView(event, idNamePair._id) }}>
                            <ArrowDropDownIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>);
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

    return (
        <ListItem
            id={idNamePair._id}
            // key={idNamePair._id}
            sx={{ display: 'flex', p: 1 }}
            style={listStyle}>
            <div id='list-top'>
                <div className="list-left">
                    {idNamePair.name}
                </div>
                <div id="list-right" style={{ display: 'inline' }}>
                    <Box style={{ display: 'inline', padding: '8px' }}>
                        <IconButton>
                            <ThumbUpOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                        <span>{idNamePair.likes}</span>
                    </Box>
                    <Box style={{ display: 'inline', padding: '8px' }}>
                        <IconButton>
                            <ThumbDownOutlinedIcon style={{ fontSize: '20pt', color: 'black' }} />
                        </IconButton>
                        <span>{idNamePair.dislikes}</span>
                    </Box>
                </div>
            </div>
            {expand}
        </ListItem>
    );
}

export default CommunityCard;