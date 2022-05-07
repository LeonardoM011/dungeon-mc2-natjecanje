# Dungeon programmer (not final name) TVZ mc2 natjecanje

### Github repozitorij za natjecanje TVZ-a mc2 2022

## Install and setup PostgreSQL  
### 1. install PostgreSQL  
### 2. create database:  
```
CREATE DATABASE natjecanje;
```
### 3. set env variable for postgresql password inside intellij terminal (or set in windows env variables):  
```
$env:POSTGRESQL_PASS="password"
```
## First run (for windows):  
### 1. install mvn dependencies:  
```
./mvnw install
```
### 2. build react app:  
```
npm run build
```
### 3. run spring boot:  
```
./mvnw springboot:run
```
## Developing (using intellij):  
### 1. turn on watch for changes webpack in powershell terminal:  
```
npm run watch
```
This will automatically update resources/static bundle.js (built react file) and target folder bundle.js file
So you don't have to run npm run build everytime you make changes to react files
### 2. run app with live changes enabled and spring boot devtools installed in intellij