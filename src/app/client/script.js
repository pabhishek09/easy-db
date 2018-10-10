(function() {
  'use strict';

  var app = {
  };

  app.setData = async function() {
    const data = await fetch('http://localhost:5000/collection');
    const json = await data.json();
    console.log(json);
    const dataEL = document.getElementById("data");
    dataEL.textContent = JSON.stringify(json);
  }

  app.setData();

})();
