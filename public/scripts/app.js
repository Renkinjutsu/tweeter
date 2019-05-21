function escape(str) { //escape text to make it safe for use
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
    }
// create a tweet template
const createTweetElement = function(database) {
    let $icons =    `<article class='new-tweet'>
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
                                ${escape(moment(database.created_at).startOf('second').fromNow())}
                            </span>
                            <span>
                                <i class='fab fa-font-awesome-flag'></i>
                                <i class='fas fa-retweet'></i>
                                <i class='fas fa-heart'></i>
                            </span>
                        </footer>
                    </article>
                    `;
    return $icons;
}
// add each individual tweet to container
function renderTweets(tweets) {
    $('#tweetsHolder').empty();
    for (i=0; i < tweets.length; i++) {
        let eachTweet = createTweetElement(tweets[i]);
        $('#tweetsHolder').prepend(eachTweet);
    }
}
// render tweets on ajax get request
function loadTweets () {
    $.get('/tweets', renderTweets);
}

$(document).ready(function() {
    // load initial tweets
    loadTweets();
    // jquery plugin, prevents eventdefault, structures error and submission pathways
    const validator = $('form').validate({
        rules: { //rules for element, input area to follow
            text: {
                required: true, 
                minlength: 1,
                maxlength: 140
            }
        },
        messages: { //resulting error messages if rules are broken
            text:{
                required: "Must have an input",
                minlength: "Write something I'm giving up on you",
                maxlength: "You've put too many characters!"
            }
        },
        errorPlacement: function(error, element) {
            // error is prepended to the parent element with error message above
            element.parent().prepend(error);
        },
        // in case of success, this function handles next steps
        submitHandler: function (form) {
            // next two variables make the data readable for the ajax
            let query = $(form).serialize();
            console.log(query)
            $.ajax({
                url: '/tweets',
                type: 'POST',
                data: query,
                error: () =>
                    console.log('error'),
                success: function () {
                    loadTweets()
                    $("#tweetbox").val("");
                }
            });  
        } 
    });
    // function to reset form on input
    $("textarea#tweetbox").on("input", function() {
        validator.resetForm();
    })
    // manage compose button
   $('#composeBtn').on('click', () => {
       $('section.new-tweet').animate({
           height: 'toggle' //toggle form
        });
        $("#tweetbox").val("");
        validator.resetForm();//reset form
        $('#tweetbox').focus(); //focuses on text area
   })       
});