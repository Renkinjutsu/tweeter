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

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = function(database) {
    // let article = document.createElement("article");  // $("<article class='new-tweet'>")
    // let header = document.createElement("header");
    // let h2 = document.createElement("h2");
    // let h3 = document.createElement("h3");
    // let p = document.createElement("p");
    // let footer = document.createElement("footer");
    // let img = document.createElement("img");
    let $icons = `<article class='new-tweet'>
                        <header>
                            <img src='${escape(database.user.avatars.small)}'>
                            <h2>${escape(database.user.name)}</h2>
                            <h3>${escape(database.user.handle)}</h3>
                        </header>
                        <p>
                            ${escape(database.content.text)}
                        </p>
                        <footer>
                            <span class='date'>
                                ${escape(moment(database.created_at))}
                            </span>
                            <span>
                                <i class='fab fa-font-awesome-flag'></i>
                                <i class='fas fa-retweet'></i>
                                <i class='fas fa-heart'></i>
                            </span>
                        </footer>
                    </article>
                    `
    // header.appendChild(img);
    // header.appendChild(h2);
    // header.appendChild(h3);
    // article.appendChild(header);
    // article.appendChild(p);
    // let newFooter = article.appendChild(footer);
    // $(newFooter).append($icons);
    // article.setAttribute("class", "new-tweet");
    // img.setAttribute("src", database.user.avatars.small)
    // h2.innerText = database.user.name;
    // h3.innerText = database.user.handle;
    // p.innerText = database.content.text;


    // $(`<article>
    //      <p>${escape(database.content)}</p>
    //   </article>`)
    return $icons;
}

function renderTweets(tweets) {
    for (i=0; i < tweets.length; i++) {
        let eachTweet = createTweetElement(tweets[i]);
        $('#tweetsHolder').prepend(eachTweet);
    }
}

function loadTweets () {
    $.get('/tweets', renderTweets)
    .then(response => {console.log(response)})
}



$(document).ready(function() {
    // load initial tweets
    loadTweets()
    // renderTweets(data)
    // $('form').on('submit', function (e) {
    //     e.preventDefault()
    const validator = $('form').validate({
        rules: {
            text: {
                required: true,
                minlength: 1,
                maxlength: 140
            }
        },
        messages: {
            text:{
                required: "Must have an input",
                minlength: "Write something I'm giving up on you",
                maxlength: "You've put too many characters!"
            }
        },
        errorPlacement: function(error, element) {
            element.parent().prepend(error)
        },
      
        submitHandler: function (form) {
            // let query = $(this).serialize();
            // let queryString =query.substring(5);
            let query = $(form).serialize();
            let queryString = query.substring(5);
            console.log(queryString)
            $.ajax({
                url: '/tweets',
                type: 'POST',
                data: query,
                error: () =>
                    console.log('error'),
                success: function () {
                    $("#tweetbox").val("");
                    loadTweets()
                }
            });    
        }   
    })
    $("textarea#tweetbox").on("input", function() {
        validator.resetForm();

    })
        // queryString.length < 140 || alert("error too many characters")
        // queryString == null && alert('please input')
        // queryString == "" && alert('please input')
    // })
   $('#composeBtn').on('click', () => {
       $('section.new-tweet').animate({
           height: 'toggle'
        })
        validator.resetForm();
        $('#tweetbox').focus()
   })
        
})
//   var $tweet = createTweetElement(tweetData)


//   $(document).ready(function() {
//   // Test / driver code (temporary)
//   console.log($tweet); // to see what it looks like
//   $('main.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
//   })