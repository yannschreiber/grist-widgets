let allRecords = [];

grist.ready({ requiredAccess: "read table" });

grist.onRecords(function (records, mappings) {
  allRecords = grist.mapColumnNames(records, mappings) || [];
  populateDropdown(allRecords);
});

function populateDropdown(records) {
  const select = document.getElementById("city-select");
  const current = select.value;

  // Clear all options except the placeholder
  select.innerHTML = '<option value="">— Select a city —</option>';

  records.forEach(function (record) {
    const option = document.createElement("option");
    option.value = record.id; // use Grist's row id as the key
    option.textContent = record.city;
    select.appendChild(option);
  });

  // Restore previous selection if it still exists
  if (current) select.value = current;

  updateDisplay();
}

document
  .getElementById("city-select")
  .addEventListener("change", updateDisplay);

function updateDisplay() {
  const select = document.getElementById("city-select");
  const display = document.getElementById("output");
  const id = Number(select.value);

  if (!id) {
    display.innerHTML = `Bienvenue sur le dashboard des températures aux Etats-Unis.<br>
    Pour chaque ville, vous trouverez ci-dessous des paragraphes de contexte utilisables dans la copie.`;
    return;
  }

  const record = allRecords.find((r) => r.id === id);
  display.innerHTML = record ? (displayEntry(record) ?? "") : "";
}

// grist.onRecord((record) => {
//   document.getElementById("output").innerHTML = displayEntry(record);
// });

function displayEntry(entry) {
  return `<div class="city">${entry.city}</div>
  <div class="content">${entry.text}</p>  
  `;
}
