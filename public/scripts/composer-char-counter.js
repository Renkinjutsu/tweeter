function updateChar() {
    $(this).val().length >= 140 ? $("span.counter").attr("style", "color:red") : $("span.counter").attr("style", "color:black")
    return $("span.counter").text(140 - $(this).val().length)  
}
$(document).ready(function() {
  $("textarea#tweetbox").on("input", updateChar)
  $("form").on("submit", updateChar)
  
});