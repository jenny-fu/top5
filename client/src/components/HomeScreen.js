import React, { useContext, useEffect } from 'react'
// import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import EditToolbar from './EditToolbar.js'
import List from '@mui/material/List';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    // const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
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
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }

    function sortBy(sort){
        store.sortBy(sort);
    }

    return (
        <div id="top5-list-selector">
            <EditToolbar sortBy={sortBy}/>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;