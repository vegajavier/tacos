let express = require("express");

let router = express.Router();

let taco = require("../models/tacos.js");

router.get("/", function(req, res){
    taco.all(function(data){
        let tacoObject = {
            tacos: data
        };
        console.log(tacoObject);
        res.render("index", tacoObject);
    });
});
router.get("/api/tacos", function(req,res){
    taco.all(function(data){
      res.send(data);
    })
  })

  router.post("/api/tacos", (req, res) => {
    taco.create([
        "taco_type", "devoured"
    ], [req.body.taco_type, 0], result => {
        
        res.redirect('/')
    });
  });
router.put("/api/tacos/:id", function(req, res){
    let condition = "id= " + req.params.id;
    console.log ("condition", condition);

    taco.update({
        devoured: req.body.devoured
    }, condition, function(result){
        if(result.changedRows == 0){
            return res.status(404).end();
        }else {
            res.status(200).end();
        }
    });
});

router.delete("/api/tacos/:id", function(req,res){
    let condition = "id= " + req.params.id;

    taco.delete(condition, function(result){
        if(result.affectedRows == 0){
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

module.exports = router