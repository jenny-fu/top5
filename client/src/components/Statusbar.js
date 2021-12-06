import React, { useContext, useEffect } from 'react'
// import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    // const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let disabled = false;
    if (store.isListEdit()) disabled = true;
    let value = store.search;
    if(value !== '') value += " Lists";


    // let text = "";
    // if (store.currentList)
    //     text = store.currentList.name;
    let out = 
        <div id="top5-statusbar">
            <div id="list-selector-heading">
                <Button
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={disabled}
                >
                    <AddIcon />
                </Button>
                <Typography variant="h4">Your Lists</Typography>
            </div>
        </div>
    if(store.all || store.community || store.user){
        out = 
        <div id="top5-statusbar">
            <div id="list-selector-heading"> 
                <Typography style={{marginTop:'12.5%'}} variant="h4">{value}</Typography>
            </div>
        </div>
    }

    return ( <div>{out}</div> );
}

export default Statusbar;