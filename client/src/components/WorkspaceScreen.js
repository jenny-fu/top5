import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js';
import { Fab, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

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
                    style={{ width: '400px', marginLeft: '1.5%', marginTop: '1%' }}
                    inputProps={{ style: { height: "10px", fontSize: '15px' } }}
                    required
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="Title"
                    autoFocus
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
            <div id="top5-statusbar">
                {/* <Typography variant="h4">{text}</Typography> */}
                <div id="list-selector-heading">
                    <Button
                        color="primary"
                        aria-label="add"
                        id="add-list-button"
                    // disabled={disabled}
                    >
                        <AddIcon />
                    </Button>
                    <Typography variant="h4">Your Lists</Typography>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen;