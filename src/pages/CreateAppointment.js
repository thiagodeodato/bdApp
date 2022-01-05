import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Image, Button, ScrollView, Platform, Input } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RadioButton from '../components/RadioButton';
import firebase from '../config/firebaseconfig';
import * as SQLite from 'expo-sqlite';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import Checkbox from "./Checkbox";

export default function CreateAppointment( {route, navigation} ) {
    
    const [personName, setPersonName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientCpf, setPatientCpf] = useState('');
    const [medicName, setMedicName] = useState('');
    const [medicCrm, setMedicCrm] = useState('');
    const [appointmentDay, setAppointmentDay] = useState();
    const [appointmentHour, setAppointmentHour] = useState('');
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

    const clickSaveHandler = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO consulta (patientCpf, medicCrm, appointmentDay, appointmentHour) values (?, ?, ?, ?)', [patientCpf, medicCrm, appointmentDay, appointmentHour],
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

    const clickShowSelectTest = (setArrayTeste) => {
        db.transaction(tx =>{
        
            tx.executeSql('SELECT * FROM testando2', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, resultSet) => {
                //console.log('result set 0', resultSet.rows[0]);
                console.log('array result antes', resultSet.rows);
                setArrayTeste(resultSet.rows);
            },
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        })
    }

    const clickSaveHandlerTest = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO testando2 (name, numero) values (?, ?)', [patientName, 0],
              (txObj, resultSet) => console.log(resultSet, 'result set do insert'),
              (txObj, error) => console.log('Error click save handler', error))
          })
    }


    setTimeout(function(){
        setPersonName(route.params);
    }, 150);

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
        <Image style={styles.logo} source={require('../assets/logotravessia.png')} />
            

        
        <KeyboardAvoidingView 
           
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.form}>
            
            <Text style = {styles.Hello}> 
            Olá, {personName}
            </Text>
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

            <Text style={styles.label}> MEDICO *</Text>
            <TextInput
                style={styles.input}
                placeholder="Fernando Costa"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(medicName) => setMedicName(medicName)}
            />

            <Text style={styles.label}> CRM *</Text>
            <TextInput
                style={styles.input}
                placeholder="452309"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(medicCrm) => setMedicCrm(medicCrm)}
            />

            <Text style={styles.label}>DIA *</Text>
            <TextInput
                style={styles.input}
                placeholder="12/05/2022"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(appointmentDay) => setAppointmentDay(appointmentDay)}
            />

            <Text style={styles.label}>HORA INÍCIO *</Text>
            <TextInput
                style={styles.input}
                placeholder="11:20"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(appointmentHour) => setAppointmentHour(appointmentHour)}
            />

            {/* <Text style={styles.label}>Cidade *</Text>
            <TextInput
                style={styles.input}
                placeholder="São Paulo"
                placeholderTextColor="#999"
                keyboardType="default"
            />

            <Text style={styles.label}>E-mail *</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                onChangeText={(value) =>                     
                    //setPerson({email: value.substr(0, value.indexOf('@')),})
                    setEmail(value.substr(0, value.indexOf('@')),)
                }
            />

            <Text style={styles.label}>Senha *</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(value) =>                     
                    //setPerson({password: value})
                    setPassword(value)
                }
            />

            <Text style={styles.label}> Condição de Mobilidade Reduzida *</Text>
            <TextInput
                style={styles.input}
                placeholder="Paralisia na perna direita"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(value) =>                     
                    //setPerson({password: value})
                    setCondition(value)
                }
            /> */}
            
            
            
{/* 
            <RadioButton
                onPress={(value) => { 
                    { 
                        teste = value;
                        console.log
                    }
                    this.setState({value:value})
                    {this.radioValue = value} 
                }}
            /> */}

            

       {/*      <RadioButton
                onPress={(value) => {this.setState({value:value})}}
            /> */}

           {/*  { this.radioValue  === 0 && (<Text style={styles.label}> Sugestão de tempo de utilização do cartão </Text>)(
            <TextInput
                style={styles.input}
                placeholder="3 meses"
                placeholderTextColor="#999"
                keyboardType="numeric"
            />)} */}


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
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickSaveHandlerTest();
                    }
                }
                >Criar Consulta TESTE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        clickShowSelectTest(setArrayTeste);
                    }
                }
                >Resultado Consulta e Salva resultado TESTE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() =>
                    {
                        console.log(arrayTeste);
                    }
                }
                >Resultado consulta salvo anteriormente TESTE</Text>
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
