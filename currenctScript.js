

setInterval(() => fetch('http://127.0.0.1:3000/getConvert')
.then(response => response.json())
.then(json => {
  document.getElementById('price-usd').innerHTML = 'Rate: ' +json.data.rate +'<br> Date: '+ json.data.date;
  console.log(json.data.date);
  console.log(json.data.rate)
}), 1000);


