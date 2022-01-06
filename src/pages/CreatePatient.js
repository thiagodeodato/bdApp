import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';

export default function CreatePatient( {route, navigation} ) {
    
    const [patientName, setPatientName] = useState('');
    const [patientCpf, setPatientCpf] = useState('');
    const [patientBirthDay, setPatientBirthDay] = useState('');
    const [patientGender, setPatientGender] = useState('');
    const [patientStreet, setPatientStreet] = useState();
    const [arrayOficial, setArrayOficial] = useState([]);
    const [arrayTeste, setArrayTeste] = useState([]);


    var db = SQLite.openDatabase(
        'teste'
    );
        
    const clickShowSelect = (setArrayOficial) => {
        db.transaction(tx =>{
        
            tx.executeSql('SELECT * FROM paciente', null, // passing sql query and parameters:null
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

    const clickSaveHandler = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO paciente (patientName, patientCpf, patientBirthDay, patientGender, patientStreet) values (?, ?, ?, ?, ?)', [patientName, patientCpf, patientBirthDay, patientGender, patientStreet],
              (txObj, resultSet) => {
                  console.log(resultSet, 'result set do insert');
                  alert('criado com sucesso');
              },
              (txObj, error) => {
                console.log('Error click save handler', error);
                alert('erro na criação');
            })
          })
    }

   /*  const clickSaveHandler = () => {
        if(email !== '' && password !== ''){

            // procedimento de salvar aqui dentro
  
        } else{
            alert('É necessário preencher todos os campos obrigatórios (*)');
        }
    } */
    
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
                onChangeText={(patientName) => setPatientName(patientName)}
            />

            <Text style={styles.label}> CPF *</Text>
            <TextInput
                style={styles.input}
                placeholder="32673387493"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={(patientCpf) => setPatientCpf(patientCpf)}
            />

            <Text style={styles.label}>DATA DE NASCIMENTO *</Text>
            <TextInput
                style={styles.input}
                placeholder="13/04/1990"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(patientBirthDay) => setPatientBirthDay(patientBirthDay)}
            />

            <Text style={styles.label}>Sexo *</Text>
            <TextInput
                style={styles.input}
                placeholder="452309"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(patientGender) => setPatientGender(patientGender)}
            />

            <Text style={styles.label}>RUA E COMPLEMENTO *</Text>
            <TextInput
                style={styles.input}
                placeholder="Rua Cristóvão Colombo"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(patientStreet) => setPatientStreet(patientStreet)}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickSaveHandler();
                    }
                }
                >Adicionar Paciente</Text>
            </TouchableOpacity>

           {/*  <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickShowSelect(setArrayOficial);
                    }
                }
                >Resultado Consulta e Salva resultado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        console.log(arrayOficial);
                    }
                }
                >Resultado consulta salvo anteriormente</Text>
            </TouchableOpacity>
 */}
            
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
