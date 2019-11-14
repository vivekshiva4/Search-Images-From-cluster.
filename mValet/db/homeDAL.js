"use strict";

var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var q=require("q");

const dbURI = "mongodb+srv://vivek:shiva@vivek-pxypq.azure.mongodb.net/test?retryWrites=true&w=majority\n"
//const dbURI = "mongodb://localhost:27017/mVe"


class HomeDAL {

    static getAllPicsByName(keyword) {
        console.log("In Dal",keyword)
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbURI, function(err, db) {
                if(err) {
                    console.log("error of db is ", err)
                    return console.log(err); }
                var dbo = db.db("mediaValetExercise");
                var regex = new RegExp(["^",keyword , "$"].join(""), "i");

                dbo.collection("Pictures").find( { keyword: { $all: [regex  ] } } ).toArray(function (err, res) {
                    var result =res;
                    console.log(result,"***********************************")
                    if (result)
                    {
                        let picInfoList = result.map(resultData => {
                            console.log("B Resultdata",resultData)
                            let picInfo = {
                                title : resultData.title,
                                url:resultData.url,
                                mType:resultData.mediaType,
                                dTime:resultData.created_at
                            }
                            return picInfo;
                        })
                        return resolve(picInfoList)
                        console.log("backend picInfoLisst",picInfoList)

                    }
                });
            });
        })
    }
}



export default HomeDAL
