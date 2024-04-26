// create DOM elements
function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}
// creating a base
let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries Wether Details");
const row = element("div", "row", "", "");

//fetch part
const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  //.then((result)=>console.log(result))
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
  <div class="card h-100">
  <div class="card-header">
  <h5 class="card-title text-center">${result[i].name.common} </h5>
  </div>
  <div class="img-box">
  <img src="${result[i].flags.png}" class="card-img-top" alt="country image">
</div>
<div class="card-body">
<div class="card-text text-center"> Region:${result[i].region}</div>
<div class="card-text text-center"> Capital:${result[i].capital}</div>
<div class="card-text text-center"> Countrycode:${result[i].cca3}</div>
<button class="btn btn-primary">Click for Weather</button>
</div>
</div>
  `;
      row.append(col);
    }
    //button logic for appending weather details form weather api
    let buttons = document.querySelectorAll("button");
    //console.log(buttons);
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        //console.log(latlng);
        let lat = latlng[0];
        let lng = latlng[1];
        //console.log(lat);
        //console.log(lng);
        let weatherapi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=cb50f767bb3067c0bc60c629867df6e1`
        );
        weatherapi
          .then((data1) => data1.json())
          .then((res) => {
             //console.log(res);
            alert(
              `weather of ${result[index].name.common} is ${Math.floor(
                res.main.temp
              )}`);
          });
      });
    });
  });

document.body.append(h1, container);
container.append(row);
