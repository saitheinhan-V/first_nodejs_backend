const express = require('express');
const { route } = require('express/lib/application');
const con = require('../db/db_connection');
const routes = express.Router();
const auth = require("../middleware/auth");


var dbConnection = true;

// con.connect((err) => {
//     if(err){
//       console.log('Error connecting to Db ' + err.message);
//       dbConnection = false;
//     //   return;
//     }else{
//         dbConnection = true;
//         console.log('Connection established');
//     }

//   });

  

routes.get("/user/list", (req, res) => { 
    
    con.query("SELECT * FROM user", (err, result, fields)=>{
        if(err) throw err;
        // console.log(result);
        res.json({
            code: 200,
            msg: "success",
            data: result
        })
    })
})



routes.post('/user/find', (req, res) => {
    const id = req.query.id;
    if(dbConnection){
        var sql = "select * from user where id =" + id;

        con.query(sql, (err, result) => {
            if(err) throw err;
            
            if(result.length > 0){
                res.json({
                    code: 200,
                    msg: "success",
                    data: result[0]
                })
                
            }else{
                res.json({
                    code: 200,
                    msg: "No user found /user/find",
                    data: {}
                })
            }
            
        })
    }else{
        res.json({
            code: 300,
            msg: "Database connection failed!"
        })
    }
})

routes.post('/user/findByAge', (req , res) => {
    var minAge = req.query.minAge;
    var maxAge = req.query.maxAge;

    var sql = "select * from user where age >= " + minAge + " AND age <= " + maxAge;

    if(dbConnection){
        con.query(sql, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                res.json({
                    code: 200,
                    msg: "success",
                    data: result
                })
            }else{
                res.json({
                    code: 200,
                    msg: "No user found /user/findByAge",
                    data: {}
                })
            }
            
        })
    }else{
        res.json({
            code: 300,
            msg: "Database connection failed!"
        })
    }
})

// routes.post('/user/:id', (req, res) => { //use request.param
//     const id = req.params.id;
//     if(id == 1){
//         res.json({
//             code: 200,
//             msg: "success",
//             data: {
//                 id: 1,
//                 name: 'sai',
//                 age: 30
//             }
//         })
//     }else if(id == 2){
//         res.json({
//             code: 200,
//             msg: "success",
//             data: {
//                 id: 2,
//                 name: 'nang',
//                 age: 25
//             }
//         })
//     }else{
//         res.send({
//             code: 200,
//             msg: "No user found /user/:id",
//             data: {}
//         })
//     }
// })

routes.param('id', function(req, res, next, id) { //use req.param
    //const modified = id.toUpperCase();

    req.id = id;
    next(); //important
  });
  
  // routes will go here
  // ...
  
  routes.get('/users/:id', function(req, res) {
    const id = req.id
    if(id == 1){
        res.json({
            code: 200,
            msg: "success",
            data: {
                id: 1,
                name: 'sai',
                age: 30
            }
        })
    }else if(id == 2){
        res.json({
            code: 200,
            msg: "success",
            data: {
                id: 2,
                name: 'nang',
                age: 25
            }
        })
    }else{
        res.send({
            code: 200,
            msg: "No user found",
            data: {}
        })
    }
  });

  routes.get('/test', (req, res) => {
      return res.json({
          test: "Test"
      });
  })

  routes.post('/user/delete/:id', (req, res) => {
      const id = req.params.id
      var sql = "delete from user where id = " + id ;

      console.log('sql');
      con.query(sql , (err, result) => {
        if(err) throw err;

        res.json({
            code: 200,
            msg: "Successfully deleted!"
        })
    })
      
  });

  routes.post('/user/update/:id/:name', (req, res) => {
      var id = req.params.id
      var name = req.params.name
      var sql = "update user set name = '" + name +"' where id = " + id ;

      con.query(sql, (err, result) => {
        if(err) throw err;

        res.json({
            code: 200,
            msg: "Successfully updated!"
        })
    })
  });

module.exports = routes;