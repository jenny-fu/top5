import React, { createContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GUEST_USER: "GUEST_USER",
    ERROR_MSG: "ERROR_MSG"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null,
        guestLogin: false
    });
    const history = useHistory();

    // useEffect(() => {
    //     auth.getLoggedIn();
    // }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: null,
                    guestLogin: false
                });
            }
            case AuthActionType.ERROR_MSG: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.msg,
                    guestLogin: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: null,
                    guestLogin: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: null,
                    guestLogin: false
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: null,
                    guestLogin: false
                });
            }
            case AuthActionType.GUEST_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: null,
                    guestLogin: true
                });
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function (userData, store) {
        const response = await api.registerUser(userData);
        console.log(response.data.errorMessage)
        if (response.status === 200) {
            if (response.data.success === false) {
                authReducer({
                    type: AuthActionType.ERROR_MSG,
                    payload: {
                        msg: response.data.errorMessage
                    }
                })
            } else {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
    }

    auth.loginUser = async function (userData, store) {
        const response = await api.loginUser(userData); //not getting passed into the api
        if (response.status === 200) {
            if (response.data.success === false) {
                authReducer({
                    type: AuthActionType.ERROR_MSG,
                    payload: {
                        msg: response.data.errorMessage
                    }
                })
            } else {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
    }

    auth.loginGuest = function (store) {
        authReducer({ type: AuthActionType.GUEST_USER })
        history.push("/allLists"); //should be sent to community..
        // store.setOption('all');
        store.setOption('all'); //doesnt set
        store.loadAllNamePairs();
    }

    auth.logoutUser = async function (store) {
        authReducer({
            type: AuthActionType.LOGOUT_USER
        })
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };