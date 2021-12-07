import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    UPDATE_VIEWING_LIST: "UPDATE_VIEWING_LIST",
    SET_HOME: "SET_HOME",
    SET_ALL: "SET_ALL",
    SET_USER: "SET_USER",
    SET_COMMUNITY: "SET_COMMUNITY",
    SET_SEARCH: "SET_SEARCH",
    UPDATE_COMMUNITY: "UPDATE_COMMUNITY",
    GUEST_LOGIN: 'GUEST_LOGIN'
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [], //array of objects
        currentList: null,
        newListCounter: 0,
        isListNameEditActive: false,
        isItemEditActive: false,
        listMarkedForDeletion: null,
        viewingList: null,
        home: true,
        all: false,
        user: false,
        community: false,
        search: '',
        communityLists: [], //array of object of new lists..? [Object{}]
        communityMapping: [], //array of maps...? [Map()]
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.SET_SEARCH: {
                return setStore({
                    idNamePairs: payload.pairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: payload.text,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: payload,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: payload,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.UPDATE_VIEWING_LIST: {
                return setStore({
                    idNamePairs: payload.pairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: payload.viewing,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.SET_HOME: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: true,
                    all: false,
                    user: false,
                    community: false,
                    search: '',
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.SET_ALL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: false,
                    all: true,
                    user: false,
                    community: false,
                    search: '',
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.SET_USER: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: false,
                    all: false,
                    user: true,
                    community: false,
                    search: '',
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.SET_COMMUNITY: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: false,
                    all: false,
                    user: false,
                    community: true,
                    search: '',
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            case GlobalStoreActionType.UPDATE_COMMUNITY: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: store.home,
                    all: store.all,
                    user: store.user,
                    community: store.community,
                    search: store.search,
                    communityLists: payload.list,
                    communityMapping: payload.map,
                });
            }
            case GlobalStoreActionType.GUEST_LOGIN: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    viewingList: null,
                    home: false,
                    all: true,
                    user: false,
                    community: false,
                    search: '',
                    communityLists: store.communityLists,
                    communityMapping: store.communityMapping,
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.dislike = async function (id, val) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.dislikes = top5List.dislikes + val;
            async function updateList(top5List) {
                let response = await api.updateTop5Dislikes(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let out = [];
                            let pairsArray = response.data.idNamePairs;
                            if(store.home){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].owner === auth.user.email) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare.startsWith(store.search.toLowerCase())) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.all){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare === store.search.toLowerCase()) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.user){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published && pairsArray[i].ownerName.toLowerCase() === store.search.toLowerCase()) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                            }else if(store.community){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                let ret = [];
                                for (let i = 0; i < out.length; i++) {
                                    let compare = out[i].name.toLowerCase();
                                    if (compare.contains(store.search.toLowerCase())) { ret.push(out[i]); }
                                }
                                out = ret.slice();
                            }

                            storeReducer({
                                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                payload: out
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.like = async function (id, val) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.likes = top5List.likes + val;
            async function updateList(top5List) {
                let response = await api.updateTop5Likes(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let out = [];
                            let pairsArray = response.data.idNamePairs;
                            if(store.home){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].owner === auth.user.email) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare.startsWith(store.search.toLowerCase())) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.all){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare === store.search.toLowerCase()) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.user){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published && pairsArray[i].ownerName.toLowerCase() === store.search.toLowerCase()) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                            }else if(store.community){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                let ret = [];
                                for (let i = 0; i < out.length; i++) {
                                    let compare = out[i].name.toLowerCase();
                                    if (compare.contains(store.search.toLowerCase())) { ret.push(out[i]); }
                                }
                                out = ret.slice();
                            }

                            storeReducer({
                                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                payload: out
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.setOption = function (opt) {
        console.log("setting options to view " + opt + " lists");
        if (opt === 'home') {
            storeReducer({ type: GlobalStoreActionType.SET_HOME });
            history.push('/');
        } else if (opt === 'all') {
            storeReducer({ type: GlobalStoreActionType.SET_ALL });
            history.push('/allLists');
        } else if (opt === 'user') {
            storeReducer({ type: GlobalStoreActionType.SET_USER });
            history.push('/userLists');
        } else if (opt === 'community') {
            storeReducer({ type: GlobalStoreActionType.SET_COMMUNITY });
            history.push('/communityLists');
        }
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;

                            let out = [];
                            for (let i = 0; i < pairsArray.length; i++) {
                                if (pairsArray[i].owner === auth.user.email) {
                                    out.push(pairsArray[i]);
                                }
                            }

                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: out,
                                    top5List: null
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.updateViewing = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            async function updateList(top5List) {
                let response = await api.updateTop5Views(top5List._id);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let out = [];
                            let pairsArray = response.data.idNamePairs;
                            if(store.home){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].owner === auth.user.email) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare.startsWith(store.search.toLowerCase())) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.all){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                if(store.search !== ''){
                                    let ret = [];
                                    for (let i = 0; i < out.length; i++) {
                                        let compare = out[i].name.toLowerCase();
                                        if (compare === store.search.toLowerCase()) { ret.push(out[i]); }
                                    }
                                    out = ret.slice();
                                }
                            }else if(store.user){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published && pairsArray[i].ownerName.toLowerCase() === store.search.toLowerCase()) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                            }else if(store.community){
                                for (let i = 0; i < pairsArray.length; i++) {
                                    if (pairsArray[i].published) {
                                        out.push(pairsArray[i]);
                                    }
                                }
                                let ret = [];
                                for (let i = 0; i < out.length; i++) {
                                    let compare = out[i].name.toLowerCase();
                                    if (compare.contains(store.search.toLowerCase())) { ret.push(out[i]); }
                                }
                                out = ret.slice();
                            }

                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_VIEWING_LIST,
                                payload: {
                                    pairs: out,
                                    viewing: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    //     // history.push("/");
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });

        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            published: false,
            ownerEmail: auth.user.email,
            ownerName: auth.user.firstName + " " + auth.user.lastName,
            views: 0,
            likes: 0,
            dislikes: 0,
            pubDate: new Date(-8640000000000000),
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs(); //email
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let out = [];
            for (let i = 0; i < pairsArray.length; i++) {
                if (pairsArray[i].owner === auth.user.email) {
                    out.push(pairsArray[i]);
                }
            }
            // console.log(out);

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.sortBy = function (sort) {
        if (sort === 'newest') {
            let out = store.idNamePairs.sort((a, b) => (!a.published) ? 1 : (!b.published) ? -1 : (a.pubDate > b.pubDate) ? 1 : ((b.pubDate > a.pubDate) ? -1 : 0))
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        } else if (sort === 'oldest') {
            let out = store.idNamePairs.sort((a, b) => (!a.published) ? 1 : (!b.published) ? -1 : (a.pubDate < b.pubDate) ? 1 : ((b.pubDate < a.pubDate) ? -1 : 0))
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        } else if (sort === 'views') { //works
            let out = store.idNamePairs.sort((a, b) => (a.views > b.views) ? -1 : ((b.views > a.views) ? 1 : 0))
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        } else if (sort === 'likes') { //works
            let out = store.idNamePairs.sort((a, b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        } else if (sort === 'dislikes') { //works
            let out = store.idNamePairs.sort((a, b) => (a.dislikes > b.dislikes) ? -1 : ((b.dislikes > a.dislikes) ? 1 : 0))
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        }
    }

    store.searchBy = async function (search) {
        if (store.home) { //search your lists (case insensitive starts with)
            const response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let out = [];
                for (let i = 0; i < pairsArray.length; i++) {
                    if (pairsArray[i].owner === auth.user.email) {
                        out.push(pairsArray[i]);
                    }
                }

                let ret = [];
                for (let i = 0; i < out.length; i++) {
                    let compare = out[i].name.toLowerCase();
                    if (compare.startsWith(search.toLowerCase())) { ret.push(out[i]); }
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_SEARCH,
                    payload: { pairs: ret, text: search }
                });
            }
        } else if (store.all) { //returns lists with name 'search' (case-insensitive match)
            const response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let out = [];
                for (let i = 0; i < pairsArray.length; i++) {
                    if (pairsArray[i].published) {
                        out.push(pairsArray[i]);
                    }
                }

                let ret = [];
                for (let i = 0; i < out.length; i++) {
                    let compare = out[i].name.toLowerCase();
                    if (compare === search.toLowerCase()) { ret.push(out[i]); }
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_SEARCH,
                    payload: { pairs: ret, text: search }
                });
            }
        } else if (store.user) { //returns lists created by 'search' (case-insensitive user name match)
            const response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let out = [];
                for (let i = 0; i < pairsArray.length; i++) {
                    if (pairsArray[i].published && pairsArray[i].ownerName.toLowerCase() === search.toLowerCase()) {
                        out.push(pairsArray[i]);
                    }
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_SEARCH,
                    payload: { pairs: out, text: search }
                });
            }
        } else if (store.community) { //returns community lists with name 'search' (case-insensitive list name match)
            const response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let out = [];
                for (let i = 0; i < pairsArray.length; i++) {
                    if (pairsArray[i].published) {
                        out.push(pairsArray[i]);
                    }
                }
                let ret = [];
                for (let i = 0; i < out.length; i++) {
                    let compare = out[i].name.toLowerCase();
                    if (compare.contains(search.toLowerCase())) { ret.push(out[i]); }
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_SEARCH,
                    payload: { pairs: ret, text: search }
                });
            }
        }
    }

    store.loadAllNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let out = [];
            for (let i = 0; i < pairsArray.length; i++) {
                if (pairsArray[i].published) {
                    out.push(pairsArray[i]);
                }
            }

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.loadCommunityPairs = async function () { //store.communitylists
        let out = store.communityLists;
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: out
        });
    }
    store.setGuest = async function (){
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let out = [];
            for (let i = 0; i < pairsArray.length; i++) {
                if (pairsArray[i].published) {
                    out.push(pairsArray[i]);
                }
            }

            storeReducer({
                type: GlobalStoreActionType.GUEST_LOGIN,
                payload: out
            });
        }
    }

    store.loadNamePairs = async function (name) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let out = [];
            for (let i = 0; i < pairsArray.length; i++) {
                if (pairsArray[i].published && pairsArray[i].ownerName === name) {
                    out.push(pairsArray[i]);
                }
            }

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: out
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.removeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: null
        });
    }

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.ItemTransaction = function (id, newText) {
        let oldText = store.currentList.items[id];
        let transaction = new UpdateItem_Transaction(store, id, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function () {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function () {
        return tps.hasTransactionToRedo();
    }

    store.isListEdit = function () {
        return store.isListNameEditActive;
    }

    store.isItemEdit = function () {
        return store.isItemEditActive;
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (newActive) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: newActive
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function (newActive) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_ITEM_EDIT_ACTIVE,
            payload: newActive
        });
    }

    store.updateItems = function (id, txt) {
        store.currentList.items[id] = txt;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    // store.updateCommunity = function (newName, listItems) {
    //     if (store.communityLists.length > 0) {
    //         let exists = false;
    //         let index = 0;
    //         for (let i = 0; i < store.communityLists.length; i++) {
    //             if (store.communityLists[i].name.toLowerCase() === newName.toLowerCase()) { //community list already exists
    //                 exists = true;
    //                 index = i;
    //                 break;
    //             }
    //         }
    //         if (exists) {
    //             let currentMapping = store.communityLists[index];
    //             for (let j = 0; j < 5; j++) {
    //                 if (currentMapping.has(listItems[j])) {
    //                     let value = currentMapping.get(listItems[j]) + (5 - j);
    //                     currentMapping.set(listItems[j], value);
    //                 }
    //                 else { //create a new entry
    //                     currentMapping.set(listItems[j], 5 - j);
    //                 }
    //             }
    //             store.communityMaps[index] = currentMapping;
    //             storeReducer({
    //                 type: GlobalStoreActionType.UPDATE_COMMUNITY,
    //                 payload: {
    //                     list: store.communityLists,
    //                     map: store.communityMaps
    //                 }
    //             });
    //         } else {
    //             let maps = store.communityMapping;
    //             let lists = store.communityLists;
    //             let hash = new Map();
    //             for (let k = 0; k < 5; k++) {
    //                 hash.set(listItems[k], 5 - k);
    //             }
    //             let payload = {
    //                 name: newName,
    //                 update: new Date(),
    //                 views: 0,
    //                 likes: 0,
    //                 dislikes: 0
    //             }
    //             maps.push(hash);
    //             lists.push(payload);
    //             storeReducer({
    //                 type: GlobalStoreActionType.UPDATE_COMMUNITY,
    //                 payload: {
    //                     list: lists,
    //                     map: maps
    //                 }
    //             });
    //         }
    //     } else { //create new mappings
    //         let maps = store.communityMapping;
    //         let lists = store.communityLists;
    //         let hash = new Map();
    //         for (let k = 0; k < 5; k++) {
    //             hash.set(listItems[k], 5 - k);
    //         }
    //         let payload = {
    //             name: newName,
    //             update: new Date().toDateString(),
    //             views: 0,
    //             likes: 0,
    //             dislikes: 0
    //         }
    //         maps.push(hash);
    //         lists.push(payload);
    //         storeReducer({
    //             type: GlobalStoreActionType.UPDATE_COMMUNITY,
    //             payload: {
    //                 list: lists,
    //                 map: maps
    //             }
    //         });
    //     }
    // }

    store.changeList = async function (newName, listItems, pub) {
        let response = await api.getTop5ListById(store.currentList._id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            top5List.items = listItems;
            top5List.published = pub;

            // if (pub) {
            //     store.updateCommunity(newName, listItems);
            // }

            // if(pub){
            //     async function communities(){
            //         response = await api.getCommunities();
            //         if(response.data.success){
            //             let currentCommunities = response.data.top5Lists;
            //             let exists = false;
            //             let id = "";
            //             for(let i = 0; i < currentCommunities.length; i++){
            //                 if(currentCommunities[i].name.toLowerCase() === newName.toLowerCase()){ //community list already exists
            //                     exists = true;
            //                     id = currentCommunities._id;
            //                     break;
            //                 }
            //             }
            //             if(exists){ //if list exists, find item in the map and add
            //                 async function getCommunity(id){
            //                     response = await api.getCommunitiesById(id);
            //                     if(response.data.success){
            //                         let community = response.data.top5List
            //                         async function update(id, community){
            //                             let currentMapping = community.items;
            //                             for(let j = 0; j < 5; j++){
            //                                 if(currentMapping.has(listItems[j])){
            //                                     let value = currentMapping.get(listItems[j]);
            //                                     currentMapping.set(listItems[j], value);
            //                                 }
            //                                 else{ //create a new entry
            //                                     currentMapping.set(listItems[j], 5-j);
            //                                 }
            //                             }
            //                             community.items = currentMapping;
            //                             await api.updateCommunity(id, community);
            //                         } update(id, community);
            //                     }
            //                 } getCommunity(id);
            //             }else{ //create new community
            //                 let hash = new Map();
            //                 for(let k = 0; k < 5; k++){
            //                     hash.set(listItems[k], 5-k);
            //                 }
            //                 let payload = {
            //                     name: newName,
            //                     items: hash, // Map
            //                     update: new Date(),
            //                     views: 0,
            //                     likes: 0,
            //                     dislikes: 0
            //                 }
            //                 await api.createCommunity(payload);
            //             }
            //         }
            //     } communities();
            // }

            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            let out = [];
                            for (let i = 0; i < pairsArray.length; i++) {
                                if (pairsArray[i].owner === auth.user.email) {
                                    out.push(pairsArray[i]);
                                }
                            }

                            if (pub) {
                                if (store.communityLists.length > 0) {
                                    let exists = false;
                                    let index = 0;
                                    for (let i = 0; i < store.communityLists.length; i++) {
                                        if (store.communityLists[i].name.toLowerCase() === newName.toLowerCase()) { //community list already exists
                                            exists = true;
                                            index = i;
                                            break;
                                        }
                                    }
                                    if (exists) {
                                        let currentMapping = store.communityLists[index];
                                        for (let j = 0; j < 5; j++) {
                                            if (currentMapping.has(listItems[j])) {
                                                let value = currentMapping.get(listItems[j]) + (5 - j);
                                                currentMapping.set(listItems[j], value);
                                            }
                                            else { //create a new entry
                                                currentMapping.set(listItems[j], 5 - j);
                                            }
                                        }
                                        store.communityMaps[index] = currentMapping;
                                        storeReducer({
                                            type: GlobalStoreActionType.UPDATE_COMMUNITY,
                                            payload: {
                                                idNamePairs: out,
                                                list: store.communityLists,
                                                map: store.communityMaps
                                            }
                                        });
                                    } else {
                                        let maps = store.communityMapping;
                                        let lists = store.communityLists;
                                        let hash = new Map();
                                        for (let k = 0; k < 5; k++) {
                                            hash.set(listItems[k], 5 - k);
                                        }
                                        let d = new Date();
                                        let payload = {
                                            name: newName,
                                            update: d.toDateString(),
                                            views: 0,
                                            likes: 0,
                                            dislikes: 0
                                        }
                                        maps.push(hash);
                                        lists.push(payload);
                                        storeReducer({
                                            type: GlobalStoreActionType.UPDATE_COMMUNITY,
                                            payload: {
                                                idNamePairs: out,
                                                list: lists,
                                                map: maps
                                            }
                                        });
                                    }
                                } else { //create new mappings
                                    let maps = store.communityMapping;
                                    let lists = store.communityLists;
                                    let hash = new Map();
                                    for (let k = 0; k < 5; k++) {
                                        hash.set(listItems[k], 5 - k);
                                    }
                                    let payload = {
                                        name: newName,
                                        update: new Date(),
                                        views: 0,
                                        likes: 0,
                                        dislikes: 0
                                    }
                                    maps.push(hash);
                                    lists.push(payload);
                                    storeReducer({
                                        type: GlobalStoreActionType.UPDATE_COMMUNITY,
                                        payload: {
                                            idNamePairs: out,
                                            list: lists,
                                            map: maps
                                        }
                                    });
                                }
                            }

                            // storeReducer({
                            //     type: GlobalStoreActionType.CHANGE_LIST_NAME,
                            //     payload: {
                            //         idNamePairs: out,
                            //         top5List: null
                            //     }
                            // });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
        // store.updateCurrentList();
        history.push("/");
    }

    store.getViewingList = function() {
        return store.viewingList;
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };