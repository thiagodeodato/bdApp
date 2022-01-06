import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import Checkbox from "./Checkbox";

export default function Appointment( {route, navigation} ) {
    
    const [personName, setPersonName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [condition, setCondition] = useState('');


    setTimeout(function(){
        setPersonName(route.params);
        
        console.log(personName);
    }, 150);

   /*  const clickSaveHandler = () => {
        if(email !== '' && password !== ''){

            // procedimento de salvar aqui dentro
  
        } else{
            alert('É necessário preencher todos os campos obrigatórios (*)');
        }
    } */

    const selectOneFile = async () => {

        let result = await DocumentPicker.getDocumentAsync({});
        if(result.uri === undefined){
            alert('Não foi possível fazer o envio do documento.')
        } else {
            alert('O documento será analisado e caso seja aprovado será possível solicitar o cartão.')
        }
        console.log(result);
    }  
    
    
    //const dbRef = firebase.database().ref();
    //console.log(dbRef);

    //TESTE DE CONEXAO PARA O CLIENTE THIAGO

    /* var radioValue = 0; */

    return (
        <ScrollView
            
            style = {styles.scrollView}>
    <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/cremed.jpg')} />
            
        
        
        <KeyboardAvoidingView 
           
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.form}>
            
            <Text style = {styles.Hello}> 
            Olá, {personName}
            </Text>

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
});
