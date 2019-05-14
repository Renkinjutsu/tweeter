/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

//   function escape(str) {
//     var div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
//   }

const createTweetElement = function(database) {
    let article = document.createElement("article");  // $("<article class='new-tweet'>")
    let header = document.createElement("header");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let footer = document.createElement("footer");
    let img = document.createElement("img");
    article.setAttribute("class", "new-tweet");
    header.appendChild(img);
    header.appendChild(h2);
    header.appendChild(h3);
    article.appendChild(header);
    article.appendChild(p);
    article.appendChild(footer);
    img.setAttribute("src", database.user.avatars.small)
    h2.innerText = database.user.name;
    h3.innerText = database.user.handle;
    p.innerText = database.content.text;
    footer.innerText = database.created_at;

    // $(`<article>
    //      <p>${escape(database.content)}</p>
    //   </article>`)
      
    return article;
}

function renderTweets(tweets, cb) {
    for (i=0; i < tweets.length; i++) {
        let eachTweet = cb(tweets[i]);
        $('main.container').append(eachTweet);
    }
}

$(document).ready(function() {
   renderTweets(data, createTweetElement)
})
//   var $tweet = createTweetElement(tweetData)


//   $(document).ready(function() {
//   // Test / driver code (temporary)
//   console.log($tweet); // to see what it looks like
//   $('main.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
//   })