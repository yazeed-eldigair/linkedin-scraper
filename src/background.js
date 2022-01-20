chrome.runtime.onInstalled.addListener(() => {
  console.log("running...");
});


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
