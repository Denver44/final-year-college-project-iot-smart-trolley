import db from "./db/conn.js";
import Cors from "cors";
import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = process.env.PORT || 80;

let itemStatus = 0;
let totalItem = 0;
let totalPrice = 0;
let currentItemName = "";
let currentItemPrice = 0;
// MIDDLEWARES
app.use(Cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// InsertQuery
function insertQuery(_card_no, _email) {
  const card_no = _card_no.substring(1, 13);
  const email = _email;
  const sql = `INSERT INTO cart (card_no, email) VALUES (?,?)`;
  db.query(sql, [card_no, email], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// DeleteQuery
function deleteQuery(_card_no) {
  db.query(
    `DELETE  FROM cart WHERE card_no =${_card_no}`,
    function (err, result) {
      if (err) throw err;
      console.log("1 record deleted");
    }
  );
}

// DeleteAllQuery
function deleteAllQuery() {
  db.query(`DELETE  FROM cart WHERE id>=${1}`, function (err, result) {
    if (err) throw err;
    console.log("Whole record deleted");
  });
}

// SelectQueryCart
function selectQueryCart(data) {
  db.query(
    "SELECT * FROM cart WHERE card_no =" + `${data}`,
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        let obj = result[0];
        // console.log(obj);
        itemStatus = 1;

        deleteQuery(data);
      } else {
        console.log("No record found");
        insertQuery(data, "durgeshrai2012@gmail.com");
        itemStatus = 2;
      }
    }
  );
}

function fetchData(data) {
  return new Promise(function (resolve, reject) {
    db.query(
      "SELECT * FROM products WHERE cardID =" + `${data}`,
      function (err, result) {
        if (err) throw err;

        currentItemName = result[0].Name;

        if (itemStatus == 1) {
          totalItem = totalItem - 1;
          totalPrice = totalPrice - result[0].Price;
          currentItemPrice = -result[0].Price;
        } else if (itemStatus == 2) {
          totalItem = totalItem + 1;
          totalPrice = totalPrice + result[0].Price;
          currentItemPrice = result[0].Price;
        }
        console.log("The Current Status is ", itemStatus);
        console.log("TotalItem ", totalItem);
        console.log("TotalPrice is ", totalPrice);
        console.log("CurrentItem is ", currentItemName);
        console.log("CurrentItemPrice is ", currentItemPrice);
        let a = `${currentItemName},${currentItemPrice},${totalItem},${totalPrice}`;
        resolve(a);
      }
    );
  });
}

// API Endpoints
app.post("/node_mcu_project/cart", async function (req, res) {
  let data = "'" + req.body.card_no + "'";
  if (req.body.card_no == "07001684DE4B") {
    totalItem = 0;
    totalPrice = 0;
    itemStatus = 0;
    currentItemName = "";
    currentItemPrice = 0;
    deleteAllQuery();
    res.status(200).end("NA,0,0,0");
  } else {
    selectQueryCart(data);

    async function main() {
      let a = await fetchData(data);
      res.status(200).send(a);
    }
    main();
  }
});

// Cart
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
            totalprice = totalprice + rows[i].Price;
          }
          res.status(200).send({ rows, totalprice });
        } else {
          res.status(200).send({ message: "Empty" });
        }
      }
    }
  );
});

// Listeners
app.listen(port, () => {
  console.log(`listening the port at  ${port}`);
});
