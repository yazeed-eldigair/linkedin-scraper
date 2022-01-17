// TASKS:
// DONE <== Add "Scrape 'Em" button
// DONE <== Add logo
// DONE <== Obtain URLs of current open tabs
// DONE <== Lookup each profile info
// DONE <== Append data to a CSV file using 'xlsx' npm package
// DONE <== Integrate chrome extension with node server

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let profiles = request.profileArray.flat().map((injectionResult) => {
    return injectionResult.result;
  });
  fetch("http://localhost:3000", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profiles),
  })
    .then((response) => response.json())
    .then(console.log);
});
