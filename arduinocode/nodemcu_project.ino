#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const char *ssid = "ESPWebServer";
const char *pass = "12345678";
const int IDLength = 12;

String card_no, postData, product, price, total, total_price;
char incomingData[IDLength];
int count, commaIndex1, commaIndex2, commaIndex3;

WiFiClient client;

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup()
{
  Wire.begin(12, 13);
  delay(2000);

  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.home();
  Serial.begin(9600);
  lcd.clear();
  lcd.print("      WELCOME ");
  lcd.setCursor(0, 1);
  lcd.print("         TO");
  lcd.setCursor(0, 2);
  lcd.print("   SMART SHOPPING");
  lcd.setCursor(0, 3);
  lcd.print("      CENTRE  ");
  delay(3000);
  lcd.clear();
  delay(1);

  Serial.print("Connecting to ");
  Serial.print(ssid);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());

  Serial.println("Scan RFID Tag!");
}

void loop() // run over and over again
{

  lcd.setCursor(0, 0);
  lcd.print("Item Name :");
  lcd.setCursor(0, 1);
  lcd.print("Item Price:");
  lcd.setCursor(0, 2);
  lcd.print("Total Item:");
  lcd.setCursor(0, 3);
  lcd.print("Total Bill:");
  delay(1);

  HTTPClient http;
  if (Serial.available())
  {
    count = 0;

    while (Serial.available() && count < IDLength)
    {
      incomingData[count] = Serial.read();
      count++;
      incomingData[count] = '\0';
      delay(5);
    }

    if (count == IDLength)
    {
      card_no = (String)incomingData;
      //      Serial.println(card_no);

      postData = "card_no=" + card_no + "&cart_id=1&user_id=1";

      http.begin("http:// 192.168.43.81:80/node_mcu_project/insert_data_into_db.php");
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

      int httpCode = http.POST(postData); //Send the request
      String payload = http.getString();  //Get the response payload
      Serial.println("response= " + payload + " status_code= " + httpCode);

      if (httpCode < 0)
      {
        Serial.printf("[HTTP] request failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
      else
      {
        //        Serial.println(httpCode);   //Print HTTP return code
        if (payload != "Unknown" && payload != "Error" && payload != "Cart Cleared")
        {
          commaIndex1 = payload.indexOf(',');
          commaIndex2 = payload.indexOf(',', commaIndex1 + 1);
          commaIndex3 = payload.indexOf(',', commaIndex2 + 1);
          product = payload.substring(0, commaIndex1);
          price = payload.substring(commaIndex1 + 1, commaIndex2);
          total = payload.substring(commaIndex2 + 1, commaIndex3);
          total_price = payload.substring(commaIndex3 + 1);
          Serial.println("Product: " + product);
          Serial.println("Price: " + price);
          Serial.println("Total: " + total);
          Serial.println("Bill: " + total_price + "\n");

          lcd.clear();
          delay(1);
          lcd.setCursor(0, 0);
          lcd.print("Item Name :");
          lcd.print(product);
          lcd.setCursor(0, 1);
          lcd.print("Item Price:");
          lcd.print(price);
          lcd.setCursor(0, 3);
          lcd.print("Total Bill:");
          lcd.print(total_price);
          lcd.setCursor(0, 2);
          lcd.print("Total Item:");
          lcd.print(total);
        }
        else
        {
          if (payload == "Cart Cleared")
          {
            Serial.println("Cart Cleared!\n");
          }
          else
          {
            Serial.println("Unknown Error Occured!\n");
          }
        }
      }

      http.end();  //Close connection
      delay(1000); //Post Data at every 5 seconds
    }
  }
}