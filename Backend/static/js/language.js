/* It is a bit trickier than I have thought it is */

(function() {
  //"use strict"

  console.log("change on new elements!");

  var $chooseLanguage = $("#language-translate-from");

  $("#language-translate-from-list li a").on("click", function() {
    var $language = $(this).text();
    var $name = $(this).attr('name');
    var $caret = '<span class="caret dropdown-arrow"></span>';
    $chooseLanguage.text($language + ' ');
    $chooseLanguage.append($caret);
    console.error("name", $name);
    $chooseLanguage.attr('name', $name);
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


(function() {
    $('.dropdown.pull-left').mouseenter(function() {
        $('.translate-from').attr('area-expanded', true);
        $('.dropdown.pull-left').addClass('open');
    });

    $('.dropdown.pull-right').mouseenter(function() {
        $('.translate-to').attr('area-expanded', true);
        $('.dropdown.pull-right').addClass('open');
    });


    $($('.dropdown.pull-left').parent(), '.translate-from').mouseleave(function(){
        $('.translate-from').attr('area-expanded', false);
        $('.dropdown.pull-left').removeClass('open');
    });

    $($('.dropdown.pull-right').parent(), '.translate-to').mouseleave(function(){
        $('.translate-to').attr('area-expanded', false);
        $('.dropdown.pull-right').removeClass('open');
    });

}) ();



function GenerateTranslateFromList(language_pairs, language_culture_names_to_estonian) {

    console.log("GenerateTranslateFromList", language_pairs, language_culture_names_to_estonian);

    var languages = new Set();
    for(var index in language_pairs) {
        console.log("index", index);
        languages.add(Object.keys(language_pairs[index])[0]);
    }
    console.log("set", languages);

    for(var language of languages.keys()) {
        console.log("language", language);
        var li = document.createElement('li'),
            a = document.createElement('a');

        a.setAttribute('href', '#');
        a.setAttribute('tabindex', '-1');
        a.setAttribute('name', language);
        a.innerHTML = language_culture_names_to_estonian[language];
        li.append(a);
        $('#language-translate-from-list').append(li)
    }

    return null;
}
