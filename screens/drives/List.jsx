import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {styles} from "../Login";
import { useAuthContext } from '../../providers/AuthProvider';
import { API } from '../../configuration/api';
import axios from 'axios';
import {requireAuth} from '../../hocs/requireAuth';

export const Drives = props => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ accessToken, userId }] = useAuthContext();

    const getDrives = useCallback(() => {
        setIsLoading(true);
        setError(null);
        axios.get(API + "/api/Drive/" + userId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken // pro autorizaci
            }
        })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
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
            getDrives();
    }, [getDrives, accessToken]);

    return (
        <View style={styles.container}>
             <View>
                <Text>Jízdy</Text> 
                {isLoading || error ? <Text>Načítám nebo chyba...</Text> : 
                    <FlatList 
                        data={data}
                        renderItem={({item}) => 
                        <View>
                            <Text>ID jízdy: {item.driveId}</Text>
                            <Text>Student: {item.studentName}</Text>
                            <Text>Instruktor: {item.instructorName}</Text>
                            <Text>Datum: {item.startDate}</Text>
                        </View>
                    }
                        keyExtractor={item => item.driveId} />
                    }
                <Button title="Znovu načíst" onPress={() => {getDrives()}} />
             </View>
        </View>
    );
};

export default requireAuth(Drives);