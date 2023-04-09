import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HOME } from "../App";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useState } from "react";
import {useAuthContext, SET_ACCESS_TOKEN} from "../providers/AuthProvider"
import { API } from "../configuration/api";
import requireLogout from "../hocs/requireLogout";

export const Login = () => { 
    const navigation = useNavigation();
    const { /*register,*/ handleSubmit, control, formState: {errors} } = useForm();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, dispatch] = useAuthContext();

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);

        axios.post(API + "/api/Auth/authenticate", 
        {
            username: data.username,
            password: data.password
        })
            .then((response) => {
                dispatch({type: SET_ACCESS_TOKEN, payload: response.data.value})
                console.log("OK", response.data.value);
                navigation.navigate(SCREEN_HOME);
           })
            .catch((error) => {
                setError(error);
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            {/* <Text>Přihlášení</Text> */}
            <View>
                <View>
                    <Text>Uživatelské jméno</Text>
                    <Controller name="username" control={control} 
                        render={({ field }) => <TextInput style={text.input} placeholder="Uživatelské jméno" {...field} />} />
                </View>
                <View>
                    <Text>Heslo</Text>
                    <Controller name="password" control={control}
                        render={({ field }) => <TextInput style={text.input} secureTextEntry={true} placeholder='Heslo' {...field} /> } />
                </View>
                <Button title={isLoading ? "Počkejte prosím..." : "Přihlásit se"}
                    onPress={handleSubmit(onSubmit)} disabled={isLoading ? true : false} />    
                {error && <Text style={text.error}>Chyba: {error.message}</Text>}
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

const text = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    },
    error: {
        color: 'red'
    },
  });

export default requireLogout(Login);