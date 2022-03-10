const jwt = require("jsonwebtoken");
const express = require('express');
const route = express.Router();
const con = require('../db/db_connection');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

var dbConnection = true;

// con.connect((err) => {
//     if(err){
//       console.log('Error connecting to Db ' + err.message);
//       dbConnection = false;
//     //   return;
//     }else{
//         dbConnection = true;
//         console.log('Connection established!!');
//     }

//   });

  route.post('/user/login', (req, res) => {
    var phNo = req.query.phoneNumber
    var pass = req.query.password

    var sql = "select * from user where phoneNumber = '" + phNo + "' AND password = '" + pass + "'";

    con.query(sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0){
            var user = result[0];
            
            if (user != null && (bcrypt.compare(pass, user.password))) {
                // Create token
                const token = jwt.sign(
                  { user_id: user.id, user_phone: user.phoneNumber },
                  process.env.TOKEN_KEY,//store
                  {
                    expiresIn: "2h",
                  }
                );
          
                // save user token
                //user.token = token;

                res.json({
                    code: 200,
                    msg: "Successfully logged in!",
                    token: token,
                    data: user
                })
          
                
              }

            
        }else{
            res.json({
                code: 200,
                msg: "No user found!",
                data: {}
            })
        }
    })
});

route.post('/user/newRegister', (req, res) => {
    var name = req.query.name
    var phNo = req.query.phoneNumber
    var pass = req.query.password
    var sql = "INSERT INTO user(name,phoneNumber,password) VALUES('" + name+"','" + phNo + "','" + pass + "')";
        con.query(sql, (err, result, fields) => {
            if(err) throw err;

            res.json({
                code: 200,
                msg: "Successfully registered!",
            })
        })
})

route.get("/welcome", auth, (req, res) => {
    res.json({
        code: 200,
        msg: "Welcome 🙌 ",
        data: JSON.stringify(req.user)
    })
    // res.status(200).send("Welcome 🙌 " + JSON.stringify(req.user));
  });


module.exports = route