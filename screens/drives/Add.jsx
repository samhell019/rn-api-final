import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import {requireAuth} from '../../hocs/requireAuth';
import { useAuthContext } from '../../providers/AuthProvider';
import CalendarPicker from 'react-native-calendar-picker';
import { API } from '../../configuration/api';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import { useToast } from 'react-native-toast-notifications';
// import { styles } from '../../styles/styles';

const Add = () => {
  const [{accessToken, userId}, dispatch] = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [data, setData] = useState([]);
  const [isUserInstructor, setIsUserInstructor] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  const [newDate2, setNewDate2] = useState(new Date());
  const getFreeDrives = useCallback(() => {
    console.log("jizdy")
    setIsLoading(true);
    setError(null);
    axios.get(API + "/api/Drive/free/" + userId, {
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
            console.log(data);
            setIsLoading(false);
        })
  });

  const isInstructor = () => {
    setIsLoading(true);
    setError(null);
    axios.get(API + "/api/Instructor/isInstructor/" + userId, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken // pro autorizaci
        }
    })
        .then((response) => {
            if(response.data === false){
                getFreeDrives();
            }
            else{
                setIsUserInstructor(true)
                console.log("ne")
            }
        })
        .catch((error) => {
            setError(error);
            console.error(error);
        })
        .finally(() => {
            console.log(data);
            setIsLoading(false);
        })
  }

  const ZapsatSe = (id) => {
    axios.get(API + "/api/Drive/" + id + "/" + userId, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken // pro autorizaci
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            setError(error);
            console.error(error);
        })
        .finally(() => {
            console.log(data);
            setIsLoading(false);
            getFreeDrives();
        })
        
  }

  const PostDrive = () => {
    console.log(newDate)
    setNewDate2(newDate);
    newDate.setHours(startTime.split(":")[0]);
    newDate.setMinutes(startTime.split(":")[1]);
    newDate2.setHours(endTime.split(":")[0]);
    newDate2.setMinutes(endTime.split(":")[1]);
    // endDate.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);
    const data = {
        insId: userId, 
        DateStart: newDate.toISOString(),
        DateEnd: newDate2.toISOString(),
      };
    //axios post
    axios.post(API + "/api/Drive/new", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken // pro autorizaci
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            setError(error);
            console.error(error);
        })
        .finally(() => {
            console.log(data);
            setIsLoading(false);
        })

    console.log(newDate.toString())
  }

  useEffect(() => {
    isInstructor();
}, []);
 
    // };
    return (
      <View>
      {
        isUserInstructor ? 
        <>
        {/* <Text>Jste instruktor</Text>  */}
        <CalendarPicker
        Date = {newDate}
  onDateChange={(date) => setNewDate(date._d)}
/>
<View style={{ flexDirection: "row" }}>
          <Text style={{}}>{"Start :    "}</Text>
          <TextInput
            style={{}}
            keyboardType={"numeric"}
            value={startTime}
            onChangeText={(text) => setStartTime(text)}
          />
     </View>
     <View style={{ flexDirection: "row" }}>
          <Text style={{}}>{"End :    "}</Text>
          <TextInput
            style={{}}
            keyboardType={"numeric"}
            value={endTime}
            onChangeText={(text) => setEndTime(text)}
          />
     </View>
<Button title="Pridat jizdu" onPress={() => {PostDrive()}} />
        </>

        
        : 
        <>
        <Text>Jizdy</Text> 
        <FlatList 
                 data={data}
                 renderItem={({item}) => <>
                  <Text>{item.instructorName}. {item.startDate} </Text>
                  <Button title="Zapsat se" onPress={() => ZapsatSe(item.driveId)} />
                 </>}
                 keyExtractor={item => item.driveId} />
             
         <Button title="Znovu načíst" onPress={() => {isInstructor()}} />
         </>
        }
         
         {/* {isLoading || error ? <Text>Načítám nebo chyba...</Text> : 
             <FlatList 
                 data={data}
                 renderItem={({item}) => <>
                  <Text>{item.instructorName}. {item.date} </Text>
                  <Button title="Zapsat se" onPress={() => ZapsatSe(item.driveId)} />
                 </>}
                 keyExtractor={item => item.driveId} />
             }
         <Button title="Znovu načíst" onPress={() => {isInstructor()}} /> */}
      </View>
    );
  };

export default requireAuth(Add);