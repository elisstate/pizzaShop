'use strict';

var http = require('http');
const express = require("express");
const os = require("os");
const fs = require('fs');

let student = {  
    name: 'Another one',
    price: 23, 
    toppings: ['yay'],
    base: [{id: 2, name: 'nay'}]
};



// var file = fs.readFileSync('./src/pizzas.json');
// var file_data = JSON.parse(file)
// let data = JSON.stringify(student);  
// file_data += data;
// console.log(file_data)
// file = JSON.stringify(file_data);



const file = require("./src/pizzas.json");


//to delete last pizza
//file.pizzas.splice(0);

//to add new pizza
//file.pizzas.push(student);


fs.writeFile("./src/pizzas.json", JSON.stringify(file));