import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let disabled = false;
    if (store.isListEdit()) disabled = true;

    let listCard = "";

    // let out = [];
    // let pairsArray = store.idNamePairs;
    // console.log("------------------------" + auth.user.email)
    // for (let i = 0; i < pairsArray.length; i++) {
    //     if (pairsArray[i]){
    //     if (pairsArray[i].hasOwnProperty("owner")){
    //         console.log(pairsArray[i].owner);    
    //         if (pairsArray[i].owner === auth.user.email) {
    //             out.push(pairsArray[i]);
    //         }         
    //     }}
    // }
    // console.log("---------out-----------" + out);

    if (store) {
        listCard =
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <Fab
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={disabled}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;