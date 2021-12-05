import React, { useContext, useEffect } from 'react'
// import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
// import AllCard from './AllCard.js'
import EditToolbar from './EditToolbar.js'
// import List from '@mui/material/List';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const UserScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    // const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadAllNamePairs();
    }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }

    let results = <div id="list-selector-list"></div>
    // results = <div id="list-selector-list">
    //     <List sx={{ width: '90%', left: '5%' }}>
    //         {
    //             store.idNamePairs.map((pair) => (
    //                 <AllCard
    //                     key={pair._id}
    //                     idNamePair={pair}
    //                     selected={false}
    //                 />
    //             ))
    //         }
    //     </List>
    // </div>
    return (
        <div id="top5-list-selector">
            <EditToolbar />
            {results}
        </div>
    );
}

export default UserScreen;