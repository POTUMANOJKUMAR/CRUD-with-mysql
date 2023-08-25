const express = require("express");
const Mysql = require("mysql2");

const app = express();
app.use(express.json());
const conection = Mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "manoj",
});
conection.connect((err) => {
  if (err) console.log(err);
  else console.log("connected!");
});
app.post("/post", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const salary = req.body.salary;
  conection.query(
    "insert into first values(?,?,?)",
    [id, name, salary],
    (err, result) => {
      if (err) console.log(err);
      else res.send("posted!");
    }
  );});
  app.get("/fetch", (req, res) => {
     const a = "select * from first";
    conection.query(a, (err, result, fields) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
  app.get('/fetch/:id',(req,res)=>{
    const fetchid=req.params.id;
    conection.query("select * from first where id=?",fetchid,(err,result)=>{
        if(err) console.log(err)
        else
            if(result.length==0)
              res.send("id is not there");
             else res.send(result)
    }
  )})
  app.put("/update/:id", (req, res) => {
    const id=req.params.id
    const salary = req.body.salary;
    const name = req.body.name;
    const b = "UPDATE first SET salary = ? ,name=? WHERE id = ?";
    conection.query(b, [salary,name, id],(err, result) => {
      if (err) console.log(err);
      else 
      if(result.affectedRows==0)
      res.send("id is not found")
    else
    res.send("updated!");
     
    });
  });
  app.delete("/delect/:id",(req,res)=>{
    const delid=req.params.id
    conection.query("delete from first where id=?",delid,(err,result)=>{
        if (err) console.log(err);
        else 
      if(result.affectedRows==0)
        res.send("id is not found")
      else
      res.send("delected!");
      
    })
  })

  

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("on port 3000");
});
