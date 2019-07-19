# PropertyProLitev2

[![Build Status](https://travis-ci.org/sharonandisi/PropertyProLitev2.svg?branch=development)](https://travis-ci.org/sharonandisi/PropertyProLitev2) [![Coverage Status](https://coveralls.io/repos/github/propertyproLitev/badge.svg?branch=developmen)](https://coveralls.io/github/sharonandisi/PropertyProLitev2?branch=developmen) <a href="https://codeclimate.com/github/sharonandisi/PropertyProLitev2/maintainability"><img src="https://api.codeclimate.com/v1/badges/78360861c52c55d3bf0a/maintainability" /></a>


# PROPERTY PRO LITE

This is a real estate application where agents and users get to post, view , update properties.

The entire application is contained within the `propertyprolitev2` folder.

`config.ru` is a minimal Rack configuration for unicorn.

`npm run start` runs the application and generates the API



## Install

    npm i

## Run the app

    npm run start-dev

## Run the tests

    npm run start-test

# REST API

The REST API to the example app is described below.

## Get list of Properties

### Request

`GET /properties/`

   'Accept: application/json' http://localhost:5000/properties/

### Response

    { 
“status” ​:​ ​‘success’​,
 ​“data” ​:​ ​{ 
​“id”​:​ Integer​, // id of owner
"status": "string"
"type": "string"
"state": "string"
"city": "string"
"address": "string"
"price": "float"
"created_on": "date/time"
"image_url": "string"​} } 
