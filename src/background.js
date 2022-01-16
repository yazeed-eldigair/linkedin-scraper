// TASKS:
// DONE <== Add "Scrape 'Em" button
// DONE <== Add logo
// DONE <== Obtain URLs of current open tabs
// DONE <== Lookup each profile info
// DONE <== Append data to a CSV file using 'xlsx' npm package
const exportProfilesToExcel = require('./exportService');

const workSheetColumnNames = ['name','linkedin_url', 'title', 'location'];
const workSheetName = 'Profiles';


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let profiles = request.profileArray.flat().map(injectionResult => {
          return injectionResult.result;
        });
        console.clear();
        console.log(profiles);
        
      }
);