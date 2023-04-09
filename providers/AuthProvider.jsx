import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "autoskola";

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const CLEAR_ACCESS_TOKEN = "CLEAR_ACCESS_TOKEN";
export const LOGOUT = "LOGOUT";

const LOAD_DATA = "LOAD_DATA";

const parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
};

const initialState = {
    accessToken: null,
    userId: null,
    profile: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            let tokenData = parseJwt(action.payload);
            return { ...state, accessToken: action.payload, userId: tokenData.sub, profile: tokenData }
        case CLEAR_ACCESS_TOKEN:
            return { ...state, accessToken: null, userId: null, profile: null }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...initialState }
        default: break;
    }
}

export const AuthContext = createContext(initialState);
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = props => {
    const [store, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadData = async (key) => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    dispatch({ type: LOAD_DATA, payload: JSON.parse(value) });
                    console.log("Data načtena z AsyncStorage.")
                } else {
                    dispatch({ type: LOAD_DATA, payload: initialState });
                }
                
            } catch(e) {
                console.error(e);
            }   
        }
        loadData(KEY);
    }, []);

    useEffect(() => {
        const storeData = async (data, key) => {
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem(key, jsonValue)
                console.log("Data uložena do AsyncStorage.")
            }
            catch (e) {
                console.error(e);
            }
        }
        storeData(store, KEY);
    }, [store]);

    return (
        <AuthContext.Provider value={[store, dispatch]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);