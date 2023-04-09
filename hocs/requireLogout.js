import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useAuthContext, LOGOUT } from "../providers/AuthProvider";

export const requireLogout = (WrappedComponent) => props  => {
    const [{accessToken, profile}, dispatch] = useAuthContext();
    if (accessToken !== null) {
        return (
            <View style={styles.container}>
                <Text>Už jsi přihlášen. (Jste {profile.unique_name})</Text>
                <Button title="Odhlásit se" onPress={() => dispatch({type: LOGOUT})} />
            </View>
        );
    } else {
        return(
            <WrappedComponent {...props}>
                {props.children}
            </WrappedComponent>
        );
    }
    
}

export default requireLogout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});