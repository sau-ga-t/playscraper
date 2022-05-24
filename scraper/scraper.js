const axios = require("axios").default;
const cheerio = require("cheerio");
const res = require("express/lib/response");




const baseUrl = "https://play.google.com/store";

const getHomeScreen = async ()=>{
    var topics = [];
    var response = await axios.get(`${baseUrl}/apps/top`);
    console.log(response.status);
    const parsedResponse = cheerio.load(response.data);
    const items = parsedResponse(".Ktdaqe");
    
    items.each(function (index, element){
        var responseMap = {};
        const apps = [];

        //Item Selectors
        const linkSelector = parsedResponse(element).find("div > div > a");
        const appListSelector = parsedResponse(element).find(".ZmHEEd");

        //Select category title text
        responseMap['title'] = linkSelector.first().children("h2").text();
        //Select link for category
        responseMap['link'] = linkSelector.first().attr('href').toString();
        
        appListSelector.children().each(function (inde, elemen){
            const details = {};
            var appCard = parsedResponse(elemen);

            var link = appCard.find(".poRVub").first().attr('href');
            details['link']= link;

            var title = appCard.find(".b8cIId").first().text();
            details['title']= title;

            var publisher = appCard.find(".KoLSrc").first().text();
            details['publisher'] = publisher;
            
            var image = appCard.find(".ZYyTud").first().children().first().attr("data-srcset");
            details['image'] = image?.split(" ")[0];

            var rating = appCard.find(".pf5lIe").first().children().first().attr("aria-label");
            details['rating'] = rating?.split(" ")[1];

            apps.push(details);
        });
        responseMap['apps'] = apps;

        // Add json data to list
        topics.push(responseMap);
    });
    return topics;
    
}


module.exports = [getHomeScreen];