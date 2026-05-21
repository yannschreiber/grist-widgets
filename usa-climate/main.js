
grist.ready();
grist.onRecord(table => {
  content = document.getElementById("app").innerHTML = "coucou"
})