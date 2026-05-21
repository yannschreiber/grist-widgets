
grist.ready();
grist.onRecords(table => {
  content = document.getElementById("app")
  content.innerHTML = "coucou"
})