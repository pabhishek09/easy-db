(function() {
  'use strict';

  var app = {
  };

  app.bootstrap = async function() {
    const fetchAllTables = await fetch('http://localhost:5000/tables');
    const allTables = await fetchAllTables.json();
    console.log(allTables);
    const fetchTableData = await fetch('http://localhost:5000/tables/' + allTables[0]);
    const tableData = await fetchTableData.json();
    const dataEL = document.getElementById("data");
    dataEL.textContent = JSON.stringify(allTables);
    const dataEL1 = document.getElementById("table");
    dataEL1.textContent = JSON.stringify(tableData);
  }

  setTimeout(() => {
    app.bootstrap()
  }, 1000);

})();
