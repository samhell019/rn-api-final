import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {styles} from "./Login";
import { useAuthContext } from '../providers/AuthProvider';
import { API } from '../configuration/api';
import axios from 'axios';
import {requireAdmin} from '../hocs/requireAdmin';

export const Users = props => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ accessToken }] = useAuthContext();

    const getUsers = useCallback(() => {
        setIsLoading(true);
        setError(null);
        axios.get(API + "/api/Users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken // pro autorizaci
            }
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [accessToken]);

    useEffect(() => {
        if (accessToken)
            getUsers();
    }, [getUsers, accessToken]);

    return (
        <View style={styles.container}>
             <View>
                <Text>Uživatelé</Text> 
                {isLoading || error ? <Text>Načítám nebo chyba...</Text> : 
                    <FlatList 
                        data={data}
                        renderItem={({item}) => <Text>{item.userId}. {item.firstName} {item.lastName}</Text>}
                        keyExtractor={item => item.userId} />
                    }
                <Button title="Znovu načíst" onPress={() => {getUsers()}} />
             </View>
        </View>
    );
};

export default requireAdmin(Users);