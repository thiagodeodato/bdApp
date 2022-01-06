import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';

export default function UpdateAppointment( {route, navigation} ) {
    
    const [patient, setPatient] = useState();
    const [patientName, setPatientName] = useState('');
    const [patientCpf, setPatientCpf] = useState('');
    const [oldPatientCpf, setOldPatientCpf] = useState('');
    const [medicName, setMedicName] = useState('');
    const [medicCrm, setMedicCrm] = useState('');
    const [oldMedicCrm, setOldMedicCrm] = useState('');
    const [appointmentDay, setAppointmentDay] = useState();
    const [appointmentHour, setAppointmentHour] = useState('');
    const [oldAppointmentDay, setOldAppointmentDay] = useState();
    const [oldAppointmentHour, setOldAppointmentHour] = useState('');
    const [arrayOficial, setArrayOficial] = useState([]);
    const [arrayTeste, setArrayTeste] = useState([]);


    var db = SQLite.openDatabase(
        'teste'
    );


        
    const clickShowSelect = (setArrayOficial) => {
        db.transaction(tx =>{
        
            tx.executeSql('SELECT * FROM consulta', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, resultSet) => {
                //console.log('result set 0', resultSet.rows[0]);
                console.log('array result antes', resultSet.rows);
                setArrayOficial(resultSet.rows);
            },
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        })
    }

    const clickUpdateHandler = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE consulta SET appointmentDay = ?, appointmentHour = ? where appointmentDay = ? and appointmentHour = ? and medicCrm = ? and patientCpf = ?', [appointmentDay, appointmentHour, oldAppointmentDay, oldAppointmentHour, oldMedicCrm, oldPatientCpf],
              (txObj, resultSet) => {
                  console.log(resultSet, 'result set do update');
                  alert('atualizado com sucesso');
              },
              (txObj, error) => {
                console.log('Error click update', error);
                alert('erro no update');
            })
        })
    }

    const deleteAppointment = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM consulta WHERE appointmentDay = ? and appointmentHour = ? and medicCrm = ? and patientCpf = ?', [oldAppointmentDay, oldAppointmentHour, oldMedicCrm, oldPatientCpf],
              (txObj, resultSet) => {
                  console.log(resultSet, 'result set do delete');
                  alert('apagado com sucesso');
              },
              (txObj, error) => {
                console.log('Error click delete', error);
                alert('erro no delete');
            })
        })
    }


    setTimeout(function(){
        setPatient(route.params);
        setOldAppointmentDay(route.params.appointmentDay);
        setOldAppointmentHour(route.params.appointmentHour);
        setOldMedicCrm(route.params.medicCrm);
        setOldPatientCpf(route.params.patientCpf);
        //console.log(patient, 'patient');
        //console.log(patient.appointmentDay)
    }, 150);
    
    return (
        <ScrollView
            
            style = {styles.scrollView}>
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/cremed.jpg')} />
            

        
        <KeyboardAvoidingView 
           
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.form}>
            
            <Text style={styles.label}>NOME PACIENTE *</Text>
            <TextInput
                style={styles.input}
                placeholder="José da Silva"
                placeholderTextColor="#999"
                keyboardType="default"
                defaultValue={route.params.patientName}
                onChangeText={(patientName) => setPatientName(patientName)}
                editable={false}
            />

            <Text style={styles.label}> CPF *</Text>
            <TextInput
                style={styles.input}
                placeholder="32673387493"
                placeholderTextColor="#999"
                keyboardType="numeric"
                defaultValue={route.params.patientCpf}
                onChangeText={(patientCpf) => setPatientCpf(patientCpf)}
                editable={false}
            />

            <Text style={styles.label}> MEDICO *</Text>
            <TextInput
                style={styles.input}
                placeholder="Fernando Costa"
                placeholderTextColor="#999"
                keyboardType="default"
                defaultValue={route.params.medicName}
                onChangeText={(medicName) => setMedicName(medicName)}
                editable={false}
            />

            <Text style={styles.label}> CRM *</Text>
            <TextInput
                style={styles.input}
                placeholder="452309"
                placeholderTextColor="#999"
                keyboardType="default"
                defaultValue={route.params.medicCrm}
                onChangeText={(medicCrm) => setMedicCrm(medicCrm)}
                editable={false}
            />

            <Text style={styles.label}>DIA *</Text>
            <TextInput
                style={styles.input}
                placeholder="12/05/2022"
                placeholderTextColor="#999"
                keyboardType="default"
                defaultValue={route.params.appointmentDay}
                onChangeText={(appointmentDay) => setAppointmentDay(appointmentDay)}
                editable={true}
            />

            <Text style={styles.label}>HORA INÍCIO *</Text>
            <TextInput
                style={styles.input}
                placeholder="11:20"
                placeholderTextColor="#999"
                keyboardType="default"
                defaultValue={route.params.appointmentHour}
                onChangeText={(appointmentHour) => setAppointmentHour(appointmentHour)}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickUpdateHandler();
                    }
                }
                >Salvar edição da consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        deleteAppointment();
                    }
                }
                >Deletar a consulta</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickShowSelect(setArrayOficial);
                    }
                }
                >Resultado Consulta e Salva resultado</Text>
            </TouchableOpacity> */}

 
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
});
