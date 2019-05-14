$(document).ready(function() {
    // --- our code goes here ---
    $("#atweet > textarea").keyup(function() {
        return $("span.counter").html(140 - $(this).val().length);
        
  })
});