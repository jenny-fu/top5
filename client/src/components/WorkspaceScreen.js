import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js';
import { Fab, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(store.currentList.name);
    let listItems = store.currentList.items;
    let disabled = false;
    let name = "";
    let style={color:'black', backgroundColor:'lightgrey', border:'solid 1px', borderRadius: '10px'};

    function updateList(){
        store.changeList(title, listItems, false);
    }
    function publishList(){
        store.changeList(title, listItems, true);
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
        </div>
    )
}

export default WorkspaceScreen;