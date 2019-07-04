var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=rainbow&api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102";

function setup() {
  noCanvas();
  loadJSON(url, gotData);
}

function gotData(data) {
  var articles = data.response.docs;

  for (var i = 0; i < articles.length; i++) {
    createElement('h1', articles[i].headline.main);
    createP(articles[i].snippet);
  }

  //println(data.response.docs[0].headline.main);
}