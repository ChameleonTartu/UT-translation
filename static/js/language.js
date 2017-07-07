/*TODO Rewrite in more modular*/


function ReCreateMenu(chooseLanguage, current_element) {
  //console.log("ReCreateMenu");
  var caret = '<span class="caret dropdown-arrow"></span>';
  var language = current_element.text();
  var name = current_element.attr('name');
  chooseLanguage.text(language + ' ');
  chooseLanguage.append(caret);
  chooseLanguage.attr('name', name);
}


(function() {
    var dropdown_pull_left = $('.dropdown.pull-left'),
        dropdown_pull_right = $('.dropdown.pull-right');
    dropdown_pull_left.mouseenter(function() {
        $('.translate-from').attr('area-expanded', true);
        dropdown_pull_left.addClass('open');
        $('div #language-translate-from-list li a.language').on('click', function() {
            ReCreateMenu($('#language-translate-from'), $(this));
            GenerateTranslateToList($(this).attr('name'), language_pairs, language_culture_names);
        });
    });

    dropdown_pull_right.mouseenter(function() {
        $('.translate-to').attr('area-expanded', true);
        dropdown_pull_right.addClass('open');
        $('div #language-translate-to-list li a.language').on('click', function() {
            ReCreateMenu($('#language-translate-to'), $(this));
        });
    });


  $(dropdown_pull_left.parent(), '.translate-from').mouseleave(function(){
    $('.translate-from').attr('area-expanded', false);
    dropdown_pull_left.removeClass('open');
  });

  $(dropdown_pull_right.parent(), '.translate-to').mouseleave(function(){
    $('.translate-to').attr('area-expanded', false);
    dropdown_pull_right.removeClass('open');
  });

}) ();



function GenerateTranslateFromList(language_pairs, language_culture_names) {

  //console.log("GenerateTranslateFromList");

  //console.log("GenerateTranslateFromList", language_pairs, language_culture_names);

  var languages = [];
  for(var index in language_pairs) {
    //console.log("index", index);
    languages.push(Object.keys(language_pairs[index])[0]);
  }
  //console.log("set", languages);

  //console.log("keys", languages);

  for(var index in languages) {
      //console.log("language", index);
    if (languages.hasOwnProperty(index)) {
      var li = document.createElement('li'),
          a = document.createElement('a');

      a.setAttribute('href', '#');
      a.setAttribute('tabindex', '-1');
      a.setAttribute('name', languages[index]);
      a.setAttribute('class', 'language padding-left-12px');
      a.innerHTML = language_culture_names[languages[index]];
      li.append(a);
      $('#language-translate-from-list').append(li);
    }
  }

  GenerateTranslateToList('et', language_pairs, language_culture_names);
}

function GenerateTranslateToList(language_translate_from, language_pairs, language_culture_names) {
  //console.log("GenerateTranslateToList");

  $('#language-translate-to-list').empty();

  var languages = [];
  for(var index in language_pairs) {
    if(Object.keys(language_pairs[index])[0] === language_translate_from) {
      languages.push(language_pairs[index][Object.keys(language_pairs[index])[0]]);
    }
  }

  var chooseLanguage = $('#language-translate-to');
  var caret = '<span class="caret dropdown-arrow"></span>';
  var name = languages[0];
  var language_ = language_culture_names[name];
  //console.log("language", languages, language_);

  chooseLanguage.text(language_ + ' ');
  chooseLanguage.append(caret);
  chooseLanguage.attr('name', name);

  for(var index in languages) {
    if (languages.hasOwnProperty(index)) {
        var li = document.createElement('li'),
            a = document.createElement('a');

        a.setAttribute('href', '#');
        a.setAttribute('tabindex', '-1');
        a.setAttribute('name', languages[index]);
        a.setAttribute('class', 'language text-right');
        a.innerHTML = language_culture_names[languages[index]];
        li.append(a);
        $('#language-translate-to-list').append(li);
    }
  }

  //console.log("GenerateTranslateToList test", languages);
  //return null;
}
