const button = document.querySelector(".btn");
let select = document.querySelector("#currSecondName");
let select2 = document.querySelector("#currFirstName");
let today = new Date().toISOString().split("T")[0];
let date = document.querySelector("#date");
let input = document.querySelector("#currFirstValue");
let input2 = document.querySelector("#currSecondValue");
//const date = '2021-04-10'
//const currency ='usd'
//'https://www.nbrb.by/api/exrates/rates/${currency}?periodicity=0&parammode=2&ondate=${date}'

const currents = {};

button.addEventListener("click", function () {
  if (select2.value === select.value) {
    input2.value = input.value;
  }
  fetch(`https://www.nbrb.by/api/exrates/rates/usd?periodicity=0&parammode=2&ondate=${date.value}`)
    .then((response) => response.json())
    .then((usd) => {
      currents.usd = usd.Cur_OfficialRate;

      return fetch(
        `https://www.nbrb.by/api/exrates/rates/eur?periodicity=0&parammode=2&ondate=${date.value}`);
    })
    .then((response) => response.json())
    .then((eur) => {
      currents.eur = eur.Cur_OfficialRate;
      console.log(eur.Cur_OfficialRate);
      if (select2.value === "byn" && select.value === "eur") {
        let result = input.value / currents.eur;
        input2.value = result.toFixed(5);
      }
      if (select2.value === "byn" && select.value === "usd") {
        let result1 = input.value / currents.usd;
        input2.value = result1.toFixed(5);
      }
      if (select.value === "byn" && select2.value === "eur") {
        let result2 = input.value * currents.eur;

        input2.value = result2.toFixed(5);
      }
      if (select.value === "byn" && select2.value === "usd") {
        let result3 = input.value * currents.usd;

        input2.value = result3.toFixed(5);
      }
      console.log(input.value);
      if (select.value === "usd" && select2.value === "eur") {
        let result6 = input.value * (currents.eur / currents.usd);

        input2.value = result6.toFixed(5);
      }

      if (select2.value === "usd" && select.value === "eur") {
        let result5 = input.value * (currents.usd / currents.eur);

        input2.value = result5.toFixed(5);
      }
    });

  console.log(currents);

  // console.log(`https://www.nbrb.by/api/exrates/rates/${select2.value}?periodicity=0&parammode=2&ondate=${date.value}`);
});
