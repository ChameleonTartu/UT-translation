function CreateImagePath(company) {
  var image_path = "image/", extension = ".png";
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

function CleanTransaltionTitle() {
  $("#translation-title").addClass("invisible");
}

function CleanTranslationDivs() {
  $("#translation-choice").empty();
  $("#translation-choice").remove(".space3percent");
}

function CleanTranslationAll() {
  CleanTransaltionTitle();
  CleanTranslationDivs();
}

function CreateTranslationRow(image_path, traslation_text) {
  var translation_div = document.createElement('div'),
      image_div = $(document.createElement('div')).addClass("wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2"),
      text_div = $(document.createElement('div')).addClass("col-lg-10 col-md-10 col-sm-10 col-xs-10"),
      image = $(document.createElement('img')).addClass("img-responsive icon-max-size pull-right");

  // Add image + translation
  $(translation_div).addClass("row");
  $(image).attr("src", image_path);
  $(image).attr("onclick", "ShowTranslatorsBasedOnTranslation()");
  $(text_div).text(traslation_text);
  $(image).appendTo(image_div);
  $(translation_div).append(image_div);
  $(translation_div).append(text_div);
  $("#translation-choice").append(translation_div);

  // Add space
  var space_div = document.createElement('div');
  $(space_div).addClass("space3percent");
  $("#translation-choice").append(space_div);

  return null;
}

function Swap(content, index1, index2) {
  var temp = content[index1];
  content[index1] = content[index2];
  content[index2] = temp;
}

function RandomShuffle(content, num_swaps = 5) {
  for(var num_swap = 0; num_swap < num_swaps; ++num_swap) {
      var index1 = Math.floor(Math.random() * content.length),
          index2 = Math.floor(Math.random() * content.length);
    Swap(content, index1, index2);
    console.log(index1, index2);
  }
  console.error(content);
  return content;
}

function CreateTranslationTitle(translation_title) {
  $("#translation-title").removeClass("invisible");
}

function ShowTranslation(content = [{translator: "google", translation: "Lorem ipsum dolor sit amet, consecteturadipiscing elit."},
                                    {translator: "google", translation: "Lorem dolor sit amet ipsum, consecteturadipiscing"},
                                    {translator: "google", translation: "Lorem ipsum dolor sit amet, adipiscingconsectetur elit."}],
                         translation_title = "Palun vali kõige parim tõlge:") {
  CleanTranslationAll();
  CreateTranslationTitle(translation_title);
  content = RandomShuffle(content);

  for(var index in content) {
    var image_path = CreateImagePath(content[index].translator);
    console.log("image_path", image_path);
    CreateTranslationRow(image_path, content[index].translation);
  }
};

function ShowTranslatorsBasedOnTranslation(
  content = [{translator: "google", translation: "Lorem ipsum dolor sit amet, consecteturadipiscing elit."},
             {translator: "microsoft", translation: "Lorem dolor sit amet ipsum, consecteturadipiscing"},
             {translator: "ut", translation: "Lorem ipsum dolor sit amet, adipiscingconsectetur elit."}]) {

  CleanTranslationAll();

  for(var index in content) {
    var image_path = CreateImagePath(content[index].translator);
    console.log("image_path", image_path);
    CreateTranslationRow(image_path, content[index].translation);
  }
};
