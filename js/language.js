(function() {
  "use strict"

  var $chooseLanguage = $("#language-translate-from");

  $("#language-translate-from-list li a").on("click", function() {
    var $language = $(this).text();
    var $caret = '<span class="caret dropdown-arrow"></span>';
    $chooseLanguage.text($language + ' ');
    $chooseLanguage.append($caret);
  })
}) ();


(function() {
  "use strict"

  var $chooseLanguage = $("#language-translate-to");

  $("#language-translate-to-list li a").on("click", function() {
    var $language = $(this).text();
    var $caret = '<span class="caret dropdown-arrow"></span>';
    $chooseLanguage.text($language + ' ');
    $chooseLanguage.append($caret);
  })
}) ();

/* TODO Add function which regenerates languages choice translate_to based on the choice translate_from */
/* TODO Function which stores all language pairs */
/* TODO Function which generates response from API, dummy until back-end is done */
/* TODO Function which mock sending to the server text and translation */
