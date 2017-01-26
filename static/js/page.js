function CreateImagePath(company) {
  var image_path = "/static/image/", extension = ".png";
  if (company === "google") {
    return image_path + company + extension;
  }
  else if (company === "microsoft") {
    return image_path + company + extension;
  }
  else if (company === "ut") {
    return image_path + company + extension;
  }
  else {
    return image_path + "question_mark" + extension;
  }
}

function CleanTranslationTitle() {
  $("#translation-title").addClass("invisible");
}

function CleanTranslationDivs() {
  $("#translation-choice").empty();
  $("#translation-choice").remove(".space1percent");
}

function CleanTranslationAll() {
  CleanTranslationTitle();
  CleanTranslationDivs();
}

function CreateTranslationRow(image_path, translation_text) {
  var translation_div = document.createElement('div'),
      image_div = $(document.createElement('div')).addClass("wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2 pointer"),
      text_div = $(document.createElement('div')).addClass("col-lg-10 col-md-10 col-sm-10 col-xs-10 translation-text pointer"),
      image = $(document.createElement('img')).addClass("img-responsive icon-max-size pull-right");

  // Add image + translation
  $(translation_div).addClass("row");
  $(image).attr("src", image_path);
  $(text_div).text(translation_text);
  $(image).appendTo(image_div);
  $(translation_div).append(image_div);
  $(translation_div).append(text_div);
  $("#translation-choice").append(translation_div);

  // Add space
  var space_div = document.createElement('div');
  $(space_div).addClass("space1percent");
  $("#translation-choice").append(space_div);

  return null;
}

function Swap(content, index1, index2) {
  var temp = content[index1];
  content[index1] = content[index2];
  content[index2] = temp;
}

function RandomShuffle(content, num_swaps = 10) {
  for(var num_swap = 0; num_swap < num_swaps; ++num_swap) {
      var index1 = Math.floor(Math.random() * content.length),
          index2 = Math.floor(Math.random() * content.length);
    Swap(content, index1, index2);
  }
  return content;
}

function CreateTranslationTitle(translation_title) {
  $("#translation-title").removeClass("invisible");
}

function FilterEmptyTranslations(content) {
    var cleaned_content = [];
    for(var sub_content in content) {
        if(content[sub_content]['translation'] != "") {
            cleaned_content.push(content[sub_content]);
        }
        console.log("i", sub_content);
    }

    return cleaned_content;
}


function ShowTranslation(content, translation_title = "Palun vali kõige parim tõlge:") {
  CleanTranslationAll();
  CleanFooter();
  CreateTranslationTitle(translation_title);

  if(content.length < 2) {
    translation_title = "";
  }

  content = FilterEmptyTranslations(RandomShuffle(content));

  for(var index in content) {
    var image_path = CreateImagePath('');
    CreateTranslationRow(image_path, content[index].translation);
  }

  CreateFooter();
  console.log("ShowTranslation");
  return content;
};

function ShowTranslatorsBasedOnTranslation(content) {

  CleanTranslationAll();
  CleanFooter();

  for(var index in content) {
    var image_path = CreateImagePath(content[index].translator);
    CreateTranslationRow(image_path, content[index].translation);
  }

  CreateFooter();
  console.log("ShowTranslatorsBasedOnTranslation");

  RemoveListeners();
};

function RemoveListeners() {
  var elements = document.getElementsByClassName("pointer");
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeEventListener('click',
                                 function() {
                                    console.log("Inside event listener", content);
                                    ShowTranslatorsBasedOnTranslation(content);
                                 },
                                 false);
    }
    console.log("Listeners removed");
};

function AddListeners() {
  var elements = document.getElementsByClassName("pointer");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click',
                                 function() {
                                    console.log("Inside event listener", content);

                                    var position = FindChosenTranslatorPosition(this);

                                    console.log("position", position);
                                    console.log("corresponding content", content[position].translator);

                                    ShowTranslatorsBasedOnTranslation(content);

                                    SaveBestTranslator(content, position);
                                 },
                                 false);
    }
    console.log("Listeners removed");
}


function FindChosenTranslatorPosition(source) {
    var clicked_row = $(source).parent(),
        rows = $('#translation-choice div.row'),
        position = -1;

    $.each(rows, function(index, row){
        if (clicked_row.is(row)) {
            position = index;
        }
    });
    return position;
}

function SaveBestTranslator(content, position) {
    var param = {}
    for (var index in content) {
        param[content[index].translator] = content[index].translation
    }

    var best_translator = content[position].translator;
    param['best_translator'] = best_translator

    console.log("param", param);
    $.ajax({
        url: '/',
        data: JSON.stringify(param, null, '\t'),
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            console.log("response", response);
        },
        error: function(error) {
            console.log("error", error);
        }
    });
}

function CreateFooter(about_url = "project_information.html",
                      contacts_url = "contacts.html",
                      about_text = "Projekti üldinfo",
                      contacts_text = "Kontakt") {
  var about_div = document.createElement('div'),
      contacts_div = document.createElement('div'),
      about_link = document.createElement('a'),
      contacts_link = document.createElement('a');

  $(about_link).attr("href", about_url);
  $(about_link).text(about_text);
  $(about_div).append(about_link);
  $(about_div).addClass("hidden-xs col-sm-6 col-md-6 col-lg-6 text-right");

  $(contacts_link).attr("href", contacts_url);
  $(contacts_link).text(contacts_text);
  $(contacts_div).append(contacts_link);
  $(contacts_div).addClass("hidden-xs col-sm-6 col-md-6 col-lg-6 text-left");

  $(".footer").append(about_div);
  $(".footer").append(contacts_div);
}

function CleanFooter() {
  $('.footer').empty();
}

function ShowMenu() {
  if($('.main-block').hasClass("hidden-xs")) {
    $('.main-block').removeClass("hidden-xs");
    $('.menu-block').addClass("hidden-xs");
  }
  else {
    $('.main-block').addClass("hidden-xs");
    $('.menu-block').removeClass("hidden-xs");
  }
}

$(function() {
    $('.translate-btn').click(function() {
        var translate_from = $('.translate-from').attr('name');
        var translate_to = $('.translate-to').attr('name');
        var source_text = $('textarea').val();

        var param = {};
        param['source_text'] = source_text;
        param['translate_from'] = translate_from;
        param['translate_to'] = translate_to;

        console.log("data", JSON.stringify(param, null, '\t'));

        $.ajax({
            url: '/',
            data: JSON.stringify(param, null, '\t'),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
                translations = JSON.parse(response)["translations"];
                console.log("response", response);
                content = ShowTranslation(content=translations);

                // Add listeners for future events
                AddListeners();
            },
            error: function(error) {
                console.log("error", error);
            }
        });
    });
});
