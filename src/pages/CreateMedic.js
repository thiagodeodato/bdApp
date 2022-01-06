import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';

export default function CreateMedic( {route, navigation} ) {
    
    const [medicName, setMedicName] = useState('');
    const [medicCrm, setMedicCrm] = useState('');
    const [medicBirthDay, setMedicBirthDay] = useState('');
    const [medicExpertise, setMedicExpertise] = useState('');
    const [arrayOficial, setArrayOficial] = useState([]);

    var db = SQLite.openDatabase(
        'teste'
    );
        
    const clickShowSelect = (setArrayOficial) => {
        db.transaction(tx =>{
        
            tx.executeSql('SELECT * FROM medico', null, // passing sql query and parameters:null
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
            tx.executeSql('INSERT INTO medico (medicName, medicCrm, medicBirthDay, medicExpertise) values (?, ?, ?, ?)', [medicName, medicCrm, medicBirthDay, medicExpertise],
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
    
    return (
        <ScrollView
            
            style = {styles.scrollView}>
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/cremed.jpg')} />
            

        
        <KeyboardAvoidingView 
           
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.form}>
            
            <Text style={styles.label}>NOME MEDICO *</Text>
            <TextInput
                style={styles.input}
                placeholder="José da Silva"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(medicName) => setMedicName(medicName)}
            />

            <Text style={styles.label}> CRM *</Text>
            <TextInput
                style={styles.input}
                placeholder="32673387493"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={(medicCrm) => setMedicCrm(medicCrm)}
            />

            <Text style={styles.label}>DATA DE NASCIMENTO *</Text>
            <TextInput
                style={styles.input}
                placeholder="13/04/1990"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(medicBirthDay) => setMedicBirthDay(medicBirthDay)}
            />

            <Text style={styles.label}>Especialidade *</Text>
            <TextInput
                style={styles.input}
                placeholder="452309"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(medicExpertise) => setMedicExpertise(medicExpertise)}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickSaveHandler();
                    }
                }
                >Criar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
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
