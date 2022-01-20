const button = document.getElementById("scrapy");

button.addEventListener("click", async () => {
  let tabsArray = await chrome.tabs.query({
    currentWindow: true,
    active: false,
  });
  let urlArray = getURLs(tabsArray);

  const profileArray = [];
  for (let i = 0; i < tabsArray.length; i++) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabsArray[i].id },
        func: lookupInfo,
      },
      (profile) => {
        profileArray.push(profile);
        if (i === tabsArray.length - 1) {
          //Send array after receiving the final name
          setTimeout(() => chrome.runtime.sendMessage({ profileArray }), 5);
        }
      }
    );
  }
});

function getURLs(tabsArray) {
  let urlArray = tabsArray.map((tab) => tab.url);
  return urlArray;
}

function lookupInfo() {
  console.log("injected succesfully!");
    let name = document.getElementsByTagName("h1")[0].innerText;
    let url = document.URL;
    let title = document.getElementsByClassName("text-body-medium break-words")[0].innerText;
    let location = document.getElementsByClassName("text-body-small inline t-black--light break-words")[0].innerText;
    return {
    name: name,
    url: url,
    title: title,
    location: location
    };
}
