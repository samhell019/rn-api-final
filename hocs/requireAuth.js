import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuthContext } from "../providers/AuthProvider";

export const requireAuth = (WrappedComponent) => props  => {
    const [{accessToken}] = useAuthContext();
    if (accessToken === null) {
        return (
            <View style={styles.container}>
                <Text>Nejsi přihlášen.</Text>
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

export default requireAuth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});