document.addEventListener("DOMContentLoaded", function(event) {   
  const address = document.getElementById('address');
  const search = document.getElementById('search');
  const result = document.getElementById('result');

  navigator.geolocation.getCurrentPosition(function(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    alert("현재 위치는 : " + latitude + ", "+ longitude);
  });
  
  address.onkeypress = (e) => {
    if (e.keyCode == 13) {
      search.onclick();
      search.classList.add("hover");
    }
    if (address.value=="") result.innerHTML="";
  }
  address.onkeyup = (e) => {
    search.classList.remove("hover");
  }
  search.onclick = () => {
    const value = address.value;
    const url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result.innerHTML = "";
        data = JSON.parse(xhttp.responseText);
        for (let {addr, name} of data.stores) {
          const li = document.createElement('li');
          li.innerHTML = `<h3>${name}</h3><p>${addr}</p>`;
          result.append(li);
        }
      }
    };
    xhttp.open("GET", url+value, true);
    xhttp.send();
  }
});
