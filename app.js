const form = document.querySelector("#searchForm");
const res = document.querySelector("#tableResult");
var upd;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;
    fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
    const r = await axios.get(
        `https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`
    );
    const price = r.data.coin.price;
    const name = r.data.coin.name;
    const volume = r.data.coin.volume;
    const priceChange1d = r.data.coin.priceChange1d;
    const target = "USD";
    var col = "green";
    if(col < 0){
        col = "red";
    }
    var date = Date();

    res.innerHTML = `<tr class = "bg-primary" style = "color: white;">
    <td>Property</td>
    <td>Value</td>
  </tr>
  <tr>
    <td>${name}</td>
    <td style = "color: ${col};"><span style="font-size: 1.3rem;"> ${price}</span> ${target}</td>
  </tr>
  <tr>
      <td>Volume (24hrs)</td>
      <td>${volume}</td>
  </tr>
  <tr>
      <td>Change</td>
      <td style="color:${col};"> ${priceChange1d}</td>
  </tr> 
  <tr>
    <td>Date</td>
    <td> ${date}</td>
  </tr>`

  upd = setTimeout(()=> fetchPrice(ctype), 100000);
};
