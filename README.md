# Projeto Banco de Dados 02/2021

## Instalação do projeto:

### Requerimentos:
- Node v16.13.0 (LTS)
- React Native Expo
- SQLite

### Passo a passo
windows
- instalar o chocolatey pelo powershell https://chocolatey.org/install
- instalar o node utilizando o chocolatey pelo powershell com o comando do site 
choco install nodejs-lts
- instalar o react native expo com o comando "npm install --global expo-cli" no powershell
- instalar visual code
- instalar o sqlite
- caso nao tenha instalar o git bash
- no local que quer baixar o projeto rodar um
git clone https://github.com/thiagodeodato/bdApp.git
- na pasta do bdApp pelo cmd ou pelo proprio visual code utilizar um "npm install" para instalar todas as dependencias
- 'npm start' para rodar o projeto


## Funções disponíveis no sistema

Foi utilizado React Expo e a base de dados SQLite no projeto. <br>
É possível cadastrar pacientes, médicos e consultas. <br>
O Medico consegue ver suas consultas após a tela de login, sendo possível clicar em qual consulta deseja ver mais informações e editar/deletar caso seja de sua vontade.