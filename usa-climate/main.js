
grist.ready();
grist.onRecord(record => {
  document.getElementById("app").innerHTML = JSON.stringify(record, null, 2);
})