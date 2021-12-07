import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import CommunityCard from './CommunityCard.js'
import Statusbar from './Statusbar.js';
import EditToolbar from './EditToolbar.js'
import List from '@mui/material/List';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommunityScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadCommunityPairs();
    }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }

    // let disabled = false;
    // if (store.isListEdit()) disabled = true;

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '90%', left: '5%' }}>
                {
                    store.idNamePairs.map((pair) => (
                        <CommunityCard
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
            <EditToolbar />
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <Statusbar/>
        </div>)
}

export default CommunityScreen;