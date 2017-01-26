
function ReCreateMenu(chooseLanguage, current_element) {
    var caret = '<span class="caret dropdown-arrow"></span>';
    var language = current_element.text();
    var name = current_element.attr('name');
    chooseLanguage.text(language + ' ');
    chooseLanguage.append(caret);
    chooseLanguage.attr('name', name);
}


(function() {
    $('.dropdown.pull-left').mouseenter(function() {
        $('.translate-from').attr('area-expanded', true);
        $('.dropdown.pull-left').addClass('open');
        $('div #language-translate-from-list li a.language').on('click', function() {
            ReCreateMenu($('#language-translate-from'), $(this));
            GenerateTranslateTo($(this).attr('name'), language_pairs, language_culture_names_to_estonian);
        });
    });

    $('.dropdown.pull-right').mouseenter(function() {
        $('.translate-to').attr('area-expanded', true);
        $('.dropdown.pull-right').addClass('open');
        $('div #language-translate-to-list li a.language').on('click', function() {
            ReCreateMenu($('#language-translate-to'), $(this));
        });
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
        a.setAttribute('class', 'language');
        a.innerHTML = language_culture_names_to_estonian[language];
        li.append(a);
        $('#language-translate-from-list').append(li)
    }

    GenerateTranslateTo('et', language_pairs, language_culture_names_to_estonian);

    return null;
}

function GenerateTranslateTo(language_translate_from, language_pairs, language_culture_names_to_estonian) {
    $('#language-translate-to-list').empty();

    var languages = new Set();
    for(var index in language_pairs) {
        if(Object.keys(language_pairs[index])[0] === language_translate_from) {
            languages.add(language_pairs[index][Object.keys(language_pairs[index])[0]]);
        }
    }

    var chooseLanguage = $('#language-translate-to');
    var caret = '<span class="caret dropdown-arrow"></span>';
    var name = languages.keys().next().value;
    var language_ = language_culture_names_to_estonian[name];
    chooseLanguage.text(language_ + ' ');
    chooseLanguage.append(caret);
    chooseLanguage.attr('name', name);

    for(var language of languages.keys()) {
        var li = document.createElement('li'),
            a = document.createElement('a');

        a.setAttribute('href', '#');
        a.setAttribute('tabindex', '-1');
        a.setAttribute('name', language);
        a.setAttribute('class', 'language');
        a.innerHTML = language_culture_names_to_estonian[language];
        li.append(a);
        $('#language-translate-to-list').append(li)
    }

    console.log("GenerateTranslateTo test", languages);

    return null;
}