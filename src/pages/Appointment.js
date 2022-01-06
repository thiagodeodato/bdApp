import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input, FlatList, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-paper';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import Checkbox from "./Checkbox";





// PRIMEIRO MODO Q NAO DEU CERTO
const data = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
    // { key: 'K' },
    // { key: 'L' },
  ];

const formatData = (data, numColumns) => {
const numberOfFullRows = Math.floor(data.length / numColumns);

let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
}

return data;
};

const numColumns = 4;

// SEGUNDO MODO 

var appointments = [
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
  {appointmentDay: '12/02/2022', appointmentHour: '10:10'},
/* {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
    {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
    {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
    {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Banana', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Apple', image: 'https://picsum.photos/seed/picsum/200/300'},
  {name: 'Orange', image: 'https://picsum.photos/seed/picsum/200/300'}, */
  
];

var justOpenedScreen = true;

export default function Appointment( {route, navigation} ) {
    
    const [personName, setPersonName] = useState('');
    const [appointmentArray, setAppointmentArray] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [condition, setCondition] = useState('');
    const [data, setData] = useState('');

    var db = SQLite.openDatabase(
        'teste'
    );

    const clickShowAppointment = (setAppointmentArray) => {
        db.transaction(tx =>{
        if(personName && personName != ''){
            tx.executeSql('SELECT * FROM consulta', null, 
            (txObj, resultSet) => {
                console.log('array result antes', resultSet.rows);
                setAppointmentArray(resultSet.rows);
            },
            (txObj, error) => console.log('Error ', error)
            )
        } else{
            tx.executeSql('SELECT * FROM consulta', null,
            (txObj, resultSet) => {
                console.log('array result antes', resultSet.rows);
                setAppointmentArray(resultSet.rows);
            },
            (txObj, error) => console.log('Error ', error)
            )
        }
            
        })
    }

     const updateAppointment = (data) => {
        db.transaction(tx =>{
            tx.executeSql('SELECT medicName FROM medico where medicCrm =' + data.medicCrm, null,
            (txObj, resultSet) => {
                if (resultSet.rows[0]){
                    data.medicName = resultSet.rows[0].medicName;
                    console.log('DATA CHANGING', resultSet.rows[0].medicName);
                }
            },
            (txObj, error) => console.log('Error ', error)
            )

            tx.executeSql('SELECT patientName FROM paciente where patientCpf =' + data.patientCpf, null,
            (txObj, resultSet) => {
                if (resultSet.rows[0]){
                    data.patientName = resultSet.rows[0].patientName;
                    console.log('DATA CHANGING', resultSet.rows[0].patientName);
                }
            },
            (txObj, error) => console.log('Error ', error)
            )
        });
        //navigation.navigate('Editar Consulta', data);
    }

    const updateAppointmentBox = () => {
        //appointments = appointmentArray;
        appointments = [];
        var i = 0;
        for (i = 0; i < appointmentArray.length; i++) {
            console.log(appointmentArray[i], 'teste' + i);
            appointments.push(appointmentArray[i]);
        }
    }

    if (justOpenedScreen == true) {
        clickShowAppointment(setAppointmentArray);
        updateAppointmentBox();
        justOpenedScreen = false;
    }
    

    setTimeout(function(){
        setPersonName(route.params);
        console.log(appointmentArray, 'appointmentArray');
        
        console.log(personName);
    }, 150);



    const appointmentViews = data => {
        return (
            
        <TouchableOpacity onPress={() => {
            updateAppointment(data);
            navigation.navigate('Editar Consulta', data);
        }}>
            <View style={styles.gridAppointment}>
                {/* <Image
                style={styles.ingredientImage}
                resizeMode="contain"
                source={data.image}
                /> */}
                <Text style={styles.appointmentsText}>{data.appointmentDay} - </Text>
                <Text style={styles.appointmentsText}>{data.appointmentHour}</Text>
            </View>
        </TouchableOpacity>
        );
      };


    
    return (
        <ScrollView style = {styles.scrollView}>
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/cremed.jpg')} />
            
        
        
        <KeyboardAvoidingView 
           
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.form}>
            
            <Text style = {styles.Hello}> 
            Olá, {personName}. Verifique suas consultas abaixo.
            </Text>

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {appointments.map((value, index) => {
                    return appointmentViews(value);
                })}
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                    onPress={() =>  
                        {
                            clickShowAppointment(setAppointmentArray);
                            updateAppointmentBox();
                        }     
                    }
                >Atualizar as Consultas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                    onPress={() => navigation.navigate('Criar Consulta')}
                >Criar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                    onPress={() => navigation.navigate('Criar Paciente')}
                >Adicionar Paciente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                    onPress={() => navigation.navigate('Criar Medico')}
                >Adicionar Medico</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
    </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        

    },
    logo: {
        width: 120,
        height: 120,
        marginTop: 30,
        marginBottom: 30
    },
    logoPrefeitura: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 283,
        height: 113,
    },
    form: {
        marginBottom:30
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#73D602',
        padding: 10,
        margin: 20
    },
    scrollView:{
    marginHorizontal: 10,
},
    buttonFile:{
    marginTop: 5
    },
    Hello: {
        fontWeight: 'bold',

        fontSize: 20,
        marginBottom: 5
    },
    appointmentsText: {
        //fontFamily: AppFonts.Primary.Sans.Regular,
        fontStyle: 'normal',
        fontWeight: '400',
        alignSelf: 'center',
        fontSize: 12,
        color: 'black',
      },
    
      gridAppointment: {
        marginTop: 12,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 8,
        marginRight: 10,
        paddingBottom: 8,
        borderRadius: 8,
      },
      ingredientImage: {
        width: 15,
        alignSelf: 'center',
        height: 15,
      },
});
