const button = document.getElementById("scrapy");

button.addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: false,
  });

  const profiles = [];

  for (let i = 0; i < tabs.length; i++) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[i].id },
        func: lookupInfo,
      },
      (profile) => {
        profiles.push(profile);
        if (i === tabs.length - 1) {
          // Send array after receiving the final name
          setTimeout(() => chrome.runtime.sendMessage({ profiles }), 5);
        }
      }
    );
  }
});


function lookupInfo() {
  const name = document.getElementsByTagName("h1")[0].innerText;
  const url = document.URL;
  const title = document.getElementsByClassName("text-body-medium break-words")[0].innerText;
  const location = document.getElementsByClassName("text-body-small inline t-black--light break-words")[0].innerText;

  return {
    name: name,
    url: url,
    title: title,
    location: location
  };
}
