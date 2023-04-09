import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuthContext } from "../providers/AuthProvider";
import {API} from "../configuration/api"

export const requireAdmin = (WrappedComponent) => props  => {
    const [{accessToken, userId}] = useAuthContext();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(false);
        if (accessToken !== null) {
            console.log(API + "/api/Users/" + userId);
            axios.get(API + "/api/Users/" + userId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken // pro autorizaci
                }})
                .then((response) => {
                    if (response.data.admin) {
                        setIsAdmin(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsAdmin(false);
                });
        }
    }, [accessToken, userId]);

    if (accessToken === null) {
        return (
            <View style={styles.container}>
                <Text>Nejsi přihlášen.</Text>
            </View>
        );
    } else if (!isAdmin && accessToken !== null) {
        return (
            <View style={styles.container}>
                <Text>Nemáš dostatečná oprávnění (admin).</Text>
            </View>
        );
    } else if(isAdmin && accessToken !== null) {
        return(
            <WrappedComponent {...props}>
                {props.children}
            </WrappedComponent>
        );
    }
    
}

export default requireAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});