function ShowTranslation() {
    $("#translation-title").html("Palun vali kõige parim tõlge:");
    $("#translation-choice").html('<div class="radio"> \
      <label><input type="radio" name="optradio" onchange="ShowTranslatorsBasedOnTranslation()">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</label> \
    </div> \
    <div class="radio" onclick="ShowTranslatorsBasedOnTranslation()"> \
      <label><input type="radio" name="optradio" onchange="ShowTranslatorsBasedOnTranslation()">Lorem dolor sit amet ipsum, consectetur adipiscing.</label> \
    </div> \
    <div class="radio"> \
      <label><input type="radio" name="optradio" onchange="ShowTranslatorsBasedOnTranslation()">Lorem ipsum dolor sit amet, adipiscing consectetur elit.</label> \
    </div>');
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

$(function(){
  $('div.radio').click(function(){
    alert("WTF??");
  });
});
