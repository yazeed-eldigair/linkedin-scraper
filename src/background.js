chrome.runtime.onInstalled.addListener(() => {
  console.log("Running...");
});

chrome.runtime.onMessage.addListener((request) => {
  const profiles = request.profileArray.flat().map(({result}) => result);

  fetch("http://localhost:3000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profiles),
  })
    .then((response) => response.json())
    .then(console.log);
});
