// TASKS:
// DONE <== Add "Scrape 'Em" button
// DONE <== Add logo
// DONE <== Obtain URLs of current open tabs
// getElements that contain the name of the person
// Store URLs and names into a CSV file

console.clear();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.profileArray.flat());
      }
);



