/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
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
  }
  

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
    article.setAttribute("class", "new-tweet");
    header.appendChild(h2);
    header.appendChild(h3);
    article.appendChild(header);
    article.appendChild(p);
    article.appendChild(footer);
    h2.innerText = database.user.name;
    h3.innerText = database.user.handle;
    p.innerText = database.content.text;
    footer.innerText = database.created_at.toString();

    // $(`<article>
    //      <p>${escape(database.content)}</p>
    //   </article>`)
      
    return article;
}
  var $tweet = createTweetElement(tweetData)


  $(document).ready(function() {
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('main.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  })