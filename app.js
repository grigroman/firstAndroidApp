const express =  require('express');
const axios = require('axios').default;
const app = express();
const port = 3000;
var cors = require('cors')



const apiKey = '52fa193ca856a6b38547cb5621f09859';

app.listen(
    port,
    () => console.log('Server started on port ' + port)
);
app.use(cors())
app.use(express.json());

app.get('/getConvert', (req, res) => {
    convertCurrency('USD', 'ILS', 1).then((message) => {
        // console.log(message);
        res.json({"message":200, "data":message})
      }).catch((e) => {
        console.log(e.message);
      });

});



  const getExchangeRate = async (from, to) => {
    try {
      const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${apiKey}`);
      const euro = 1 / response.data.rates[from];
      const rate = euro * response.data.rates[to];
  
      if (isNaN(rate)) {
        throw new Error();
      }
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const data = {"rate":rate,
                     "timestamp":response.data.timestamp,
                      "date":response.data.date,
                    "current_time":time};

    //  var price_USD = document.getElementById('price-usd');
    //  var USDPrice = '<p>USDEUR Price:' + data.something + '</p>';
    //  price_USD.innerHTML += USDPrice;
      return data;
    } catch (e) {
      throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
  };

//   const getCountries = async (currencyCode) => {
//     try {
//       const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
//       return response.data.map((country) => country.name);
//     } catch (e) {
//       throw new Error(`Unable to get countries that use ${currencyCode}.`)
//     }
//   };

  const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    // console.log(rate)
    // const countries = await getCountries(to);
    // const convertedAmount = (amount * rate).toFixed(2);
    // const toReturn = {"worth":rate, "time":"time"};
    // return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
    return rate;
  };




