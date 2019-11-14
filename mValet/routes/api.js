var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var mv = require('mv');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var xml2js = require('xml2js');
var mongoose = require('mongoose');
var q=require("q");


import HomeController from '../controllers/homeController.js'

var xml2js = require('xml2js');
var parser = new xml2js.Parser(xml2js.defaults["0.2"]);
var builder = new xml2js.Builder(xml2js.defaults["0.2"]);

var MongoClient = require('mongodb').MongoClient;

router.get('/picListByKeywordSearch',function(request, response){
    console.log("in pics")

    let keyword = request.query.keywordName;
    if(!keyword) {
        let result = {}
        result.success = false;
        result.status = 415;//Required feilds
        response.send(result)
        console.log(responseData +"*******in api")
    }else{
        console.log("Db connected for the api")
        let result = {}
        HomeController.getAllPicsByName(keyword).then(responseData => {
            result.success = true;
            result.status = 200;// ok response
            result.picInfo = responseData
            response.send(result)
        }).catch(error => {
            result.success = false;
            result.status = 204;//No content
            response.send(result)

        })

    }
});

router.get('*', function(request, response){
    response.status(404).send('Not found');
});

router.post('*', function(request, response){
    response.status(404).send('Not found');
});

module.exports = router;