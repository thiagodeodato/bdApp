import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import Homepage from './src/pages/Homepage';
import Appointment from './src/pages/Appointment';
import CreateAppointment from './src/pages/CreateAppointment';
import UpdateAppointment from './src/pages/UpdateAppointment';
import CreatePatient from './src/pages/CreatePatient';
import CreateMedic from './src/pages/CreateMedic';
import ActionBarImage from './src/pages/Icon_Perfil';
import Notification_bell from './src/pages/Icon_Notification';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

    var db = SQLite.openDatabase(
        'teste'
    );
// criando as tabelas utilizadas pelo nosso sistema

    db.transaction(tx =>{

        tx.executeSql( 
        'create table if not exists testando2 (id integer primary key not null, name text, numero integer);',
        [],
        (txn, rs) => console.log('successfull create if not exists  table testando2'),
        (error) => console.log('error create if not exists  table testando2')
        );

       /*  tx.executeSql( 
            'drop table consulta;',
            [],
            (txn, rs) => console.log('successfull drop table'),
            (error) => console.log('error drop table')
            ) */

        tx.executeSql( 
            'create table if not exists consulta (id integer primary key not null, patientCpf integer, medicCrm integer, appointmentDay text, appointmentHour text);',
            [],
            (txn, rs) => console.log('successfull create if not exists table consulta'),
            (error) => console.log('error create if not exists  table consulta')
        );

        /*  tx.executeSql( 
            'drop table paciente;',
            [],
            (txn, rs) => console.log('successfull drop table paciente'),
            (error) => console.log('error drop table')
            ) */

        tx.executeSql( 
            'create table if not exists paciente (id integer primary key not null, patientName text, patientCpf integer, patientBirthDay text, patientGender text, patientStreet text);',
            [],
            (txn, rs) => console.log('successfull create if not exists table paciente'),
            (error) => console.log('error create if not exists  table paciente')
        )
        
        /*  tx.executeSql( 
            'drop table medico;',
            [],
            (txn, rs) => console.log('successfull drop table medico'),
            (error) => console.log('error drop table')
            ) */

        tx.executeSql( 
            'create table if not exists medico (id integer primary key not null, medicName text, medicCrm integer, medicBirthDay text, medicExpertise text);',
            [],
            (txn, rs) => console.log('successfull create if not exists table medico'),
            (error) => console.log('error create if not exists  table medico')
        )

    });

    //this.fetchData();

  return (
    <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: '20', //Impacta na execucao do android mas nao no iphone
          alignItems: 'center',
          justifyContent: 'center'
        },
        headerTintColor: 'black',
        headerStyle: { backgroundColor: '#d8d8d8'},
        }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Criar Consulta" component={CreateAppointment} />
        <Stack.Screen name="Editar Consulta" component={UpdateAppointment} />
        <Stack.Screen name="Criar Paciente" component={CreatePatient} />
        <Stack.Screen name="Criar Medico" component={CreateMedic} />
        <Stack.Screen 
          name="Appointment" 
          component={Appointment}
          options={{
            title: 'Consultas',
            headerLeft: () => <ActionBarImage/>,
            headerBackVisible: true,
          }}/>
        <Stack.Screen 
          name="Página Inicial" 
          component={Homepage}
          options={{
            title: 'Página Inicial',
            headerLeft: () => <ActionBarImage/>,
            //headerBackVisible: true, // tirar na apresentação 
            headerRight: () => <Notification_bell/>
          }}/>
    </Stack.Navigator>
  </NavigationContainer>
    /* <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button
        title="Go to Login"
        onPress={
          () => this.props.navigation.navigate('Login')
        }
      />
      <StatusBar style="auto" />
    </View> */
  );
}


