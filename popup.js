const button = document.getElementById("scrapy");

button.addEventListener("click", async () => {
  let tabsArray = await chrome.tabs.query({
    currentWindow: true,
    active: false,
  });
  let urlArray = getURLs(tabsArray);

  // let [currentTab] = await chrome.tabs.query({
  //   active: true,
  //   currentWindow: true,
  // });

  // chrome.runtime.sendMessage({ currentTab });

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
  console.log("Profile name:", name);
  console.log("Profile URL:", url);
  return {
    name: name,
    url: url,
  };
}
