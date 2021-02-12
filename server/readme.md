const express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 80;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemcu_db",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

function insertQuery(_card_no, _email) {
  const card_no = _card_no.substring(1, 13);
  const email = _email;
  const sql = `INSERT INTO cart (card_no, email) VALUES (?,?)`;

  connection.query(sql, [card_no, email], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function deleteQuery(_card_no) {
  connection.query(
    `DELETE  FROM cart WHERE card_no =${_card_no}`,
    function (err, result) {
      if (err) throw err;
      console.log("1 record deleted");
    }
  );
}
function selectQueryProducts(data) {
  connection.query(
    "SELECT * FROM products WHERE cardID =" + `${data}`,
    function (err, result) {
      if (err) throw err;
      obj = {
        id: result[0].id,
        cardID: result[0].cardID,
        Name: result[0].Name,
        Price: result[0].Price,
        image_path: result[0].image_path,
      };
      console.log(obj);
      return true;
    }
  );
}

function deleteAllQuery() {
  connection.query(`DELETE  FROM cart WHERE id>=${1}`, function (err, result) {
    if (err) throw err;
    console.log("Whole record deleted");
  });
}

function selectQueryCart(data) {
  connection.query(
    "SELECT * FROM cart WHERE card_no =" + `${data}`,
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        if (result[0].card_no == "07001684DE4B") {
          deleteAllQuery();
        } else {
          obj = {
            id: result[0].id,
            cardID: result[0].card_no,
            email: result[0].email,
          };
          console.log(obj);
          deleteQuery(data);
        }
      } else {
        insertQuery(data, "durgeshrai2012@gmail.com");
        console.log("No record found");
      }
    }
  );
}
app.post("/node_mcu_project/insert", urlencodedParser, function (req, res) {
  let data = "'" + req.body.card_no + "'";
  let a = selectQueryCart(data);
  res.status(200).send("POST");
});

app.get("/", async (req, res) => {
  connection.query(
    "SELECT id,cardID ,Name ,Price FROM products",
    function (err, rows, field) {
      if (err) {
        console.log("Error in the query");
      } else {
        console.log("SUCCESS");
        console.log(rows);
      }
    }
  );
  res.status(200).send("HELLO");
});

app.get("/cart", async (req, res) => {
  db.query(
    "SELECT cardID,Name,Price ,image_path , ratings FROM products JOIN cart on cart.card_no = products.cardID",
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        let totalprice = 0;
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            // console.log({
            //   Name: rows[i].Name,
            //   cardID: rows[i].cardID,
            //   Price: rows[i].Price,
            //   imag_path: rows[i].image_path,
            //   ratings: rows[i].ratings,
            // });
            totalprice = totalprice + rows[i].Price;
          }
          // console.log(totalprice);
          res.status(200).send({ rows, totalprice });
        } else {
          res.status(200).send({ message: "Empty" });
        }
      }
    }
  );
});


//LISTENER
app.listen(port, () => {
  console.log(`listening the port at  ${port}`);
});
