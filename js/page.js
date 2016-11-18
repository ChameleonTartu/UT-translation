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

function CreateTranslationRow(image_path, traslation_text) {
  // $(document.createElement('img'))
  var translation_div = $(document.createElement('div')).addClass("row"),
      image_div = $(document.createElement('div')).addClass("wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2"),
      text_div = $(document.createElement('div')).addClass("col-lg-10 col-md-10 col-sm-10 col-xs-10"),
      image = $(document.createElement('img')).addClass("img-responsive icon-max-size pull-right");

  image.attr("src", image_path);
  console.log("image", image);
  text_div.text(traslation_text);
  console.log("text_div", text_div);
  image.appendTo(image_div);
  //image_div.append(image);
  console.log("image_div", image_div);
  translation_div.append(image_div);
  console.log("translation_div", translation_div);
  translation_div.append(text_div);
  console.log("translation_div", translation_div);

  return translation_div;
}

function ShowTranslation(content = [{translator: "google", translation: "hello"},
                                    {translator: "google", translation: "goodb"},
                                    {translator: "google", translation: "oouch"}], translation_title = "Palun vali kõige parim tõlge:") {
    /*alert("ShowTranslation");*/
    $("#translation-title").text(translation_title);
    for(var index in content) {
      var image_path = CreateImagePath(content[index].translator);
      console.log("image_path", image_path);
      var translation_div = CreateTranslationRow(image_path, content[index].translation);
      $("#translation-choice").append(translation_div);
      console.log("tarnsaltion_div", translation_div);
      console.log("index", index);
      console.log("content[index].translator", content[index].translator);
      console.log("content[index].translation", content[index].translation);
      //console.error(element);
    }
};

/*
function ShowTranslatorsBasedOnTranslation() {
  //$("#translation-title").empty();
  //$("#translation-choice").empty();

  $("#companies-translators").html('
    <div class="row"> \
      <div class="wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2"> \
          <img class="img-responsive icon-max-size" src="image/Microsoft_GREY.png"/> \
      </div> \
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"> \
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      </div> \
    </div> \
    \
    <div class="space10px"></div> \
    \
    <div class="row"> \
      <div class="wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2"> \
          <img class="img-responsive icon-max-size" src="image/TU_GREY.png"/> \
      </div> \
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"> \
        Lorem dolor sit amet ipsum, consectetur adipiscing. \
      </div> \
    </div> \
    \
    <div class="space10px"></div> \
    \
    <div class="row"> \
      <div class="wrapper col-lg-2 col-md-2 col-sm-2 col-xs-2"> \
          <img class="img-responsive icon-max-size" src="image/Google_GREY.png"/> \
      </div> \
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"> \
        Lorem ipsum dolor sit amet, adipiscing consectetur elit. \
      </div> \
    </div>'
  );
};
*/
