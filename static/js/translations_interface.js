/* TODO! Make JS refactoring to make code more modular */

function Renderer(parameters) {
    var innerContent = parameters.content;

    function renderTranslate() {
        return showTranslationMode(innerContent);
    }

    function renderPlay() {
        return showPlayMode(innerContent);
    }

    return {
        renderTranslateMode: renderTranslate,
        renderPlayMode: renderPlay
    };
}


function PageRenderer() {

    // Header
    function drawHeader(content) {
        if (content === undefined) {
            return;
        }

        var translation_title = $('#translation-title');
        if (content.length > 1) {
            translation_title.removeClass('invisible');
        }
        else {
            translation_title.addClass('invisible');
        }
    }

    function eraseHeader() {
        var translation_title = $('#translation-title');
        translation_title.addClass('invisible');
    }

    // Body
    function eraseBody() {
        var translation_choice = $("#translation-choice");
        translation_choice.empty();
        translation_choice.remove(".space1percent");
    }

    // eraseAll
    function eraseAll() {
        eraseHeader();
        eraseBody();
    }

    // Loader
    function drawLoader() {
        $('.translation-loader').removeClass('hidden');
    }

    function eraseLoader() {
        $('.translation-loader').addClass('hidden');
    }

    return {
        header: {
            draw: drawHeader,
            erase: eraseHeader
        },
        body: {
            erase: eraseBody
        },
        page: {
            erase: eraseAll
        },
        loader: {
            draw: drawLoader,
            erase: eraseLoader
        }
    };
}

function PlayModeRenderer() {
    var pageRenderer = new PageRenderer();

    function drawBody(content) {
        /*TODO Implement it*/
    }

    function drawPage(content) {
        pageRenderer.header.draw(content);
        drawBody(content);
    }

    return {
        page: {
            draw: drawPage,
            erase: pageRenderer.page.erase
        }
    };
}

// TODO: Implement!
function TranslateModeRenderer() {
    var pageRenderer = new PageRenderer();

    function drawVisualization() {
        /*TODO Implement it*/
    }

    function drawBody(content) {
        /*TODO Implement it*/
    }

    /*TODO Think about it more rigorously*/
    function drawPage(paramaters) {
        var content = paramaters.content;
        pageRenderer.header.draw(content);

        // TODO Change these methods to non-dummy one
        drawBody(content);
        drawVisualization();
    }

    return {
        page: {
            draw: drawPage,
            erase: pageRenderer.page.erase
        }
    };
}


function TranslationsFormatter(parameters) {
    var innerContent = parameters.content;

    function Formatter(parameters) {
        var innerContent = parameters.content;

        function swap(parameters) {
            var index1 = parameters.index1,
                index2 = parameters.index2;

            if (innerContent.hasOwnProperty(index1) && innerContent.hasOwnProperty(index2)) {
                var temp = innerContent[index1];
                innerContent[index1] = innerContent[index2];
                innerContent[index2] = temp;
            }
        }

        function filterEmpty() {
            var cleanedContent = [];
            for (var prop in innerContent) {
                if (innerContent.hasOwnProperty(prop) &&
                    innerContent[prop].hasOwnProperty('translation') &&
                    innerContent[prop]['translation'] !== "") {
                    cleanedContent.push(innerContent[prop]);
                }
            }

            innerContent = cleanedContent;
        }

        function shuffleTranslations() {
            var NUM_SWAPS = 10;
            for (var num_swap = 0; num_swap < NUM_SWAPS; ++num_swap) {
                var index1 = Math.floor(Math.random() * innerContent.length),
                    index2 = Math.floor(Math.random() * innerContent.length);
                swap({index1: index1, index2: index2});
            }
        }

        function getContent() {
            return innerContent;
        }

        return {
            filter: filterEmpty,
            shuffle: shuffleTranslations,
            get: getContent
        }
    }

    function formatContent() {
        var formatter = new Formatter({content: innerContent});
        formatter.shuffle();
        formatter.filter();
        return formatter.get();
    }

    return {
        format: formatContent
    };
}


function ImagePathGenerator() {
    /**
     * @return {string}
     */
    function generateImagePath(parameters) {
        var company = (parameters.company === undefined) ? "" : parameters.company,
            color = (parameters.color === undefined) ? "" : "_" + parameters.color;

        var IMAGE_PATH = "/static/image/",
            IMAGE_EXTENSION = ".png",
            DEFAULT_IMAGE_NAME = "question_mark",
            AVAILABLE_TRANSLATORS = ["google", "tilde", "ut"];

        for (var prop in AVAILABLE_TRANSLATORS) {
            if (AVAILABLE_TRANSLATORS.hasOwnProperty(prop) && company === AVAILABLE_TRANSLATORS[prop]) {
                return IMAGE_PATH + company + color + IMAGE_EXTENSION;
            }
        }

        return IMAGE_PATH + DEFAULT_IMAGE_NAME + IMAGE_EXTENSION;
    }

    return {
        generate: generateImagePath
    };
}


function ContentGenerator(parameters) {
    var innerContent = parameters.content;

    var imagePathGenerator = new ImagePathGenerator();

    function generateTranslationRows() {
        for (var prop in innerContent) {
            if (innerContent.hasOwnProperty(prop)) {
                generateTranslationRow(prop);
            }
        }
    }

    function generateTranslationRow(prop) {
        var imagePath = ((innerContent.length > 1) ?
            imagePathGenerator.generate({}) :
            imagePathGenerator.generate({company: innerContent[prop]['translator']}));

        var parameters = {
            imagePath: imagePath,
            translationText: innerContent[prop]['translation']
        };
        generateTranslationRowAsHTML(parameters);
    }

    function generateTranslationRowAsHTML(parameters) {
        var imagePath = parameters.imagePath,
            translationText = parameters.translationText,
            additionalClass = parameters.additionalClass === undefined ? "" : parameters.additionalClass;
        CreateTranslationRow(imagePath, translationText, additionalClass);
    }

    return {
        generate: generateTranslationRows
    };
}

/*TODO Refactor this function*/
function CreateTranslationRow(image_path, translation_text, extra_class) {

    var translation_div = document.createElement('div'),
        image_div = $(document.createElement('div')).addClass("col-lg-1 col-md-1 col-sm-1 col-xs-1 container-img" +
            " pointer"),
        text_div = $(document.createElement('div')).addClass("col-lg-offset-1 col-lg-11" +
            " col-md-offset-1 col-md-11" +
            " col-sm-offset-1 col-sm-11" +
            " col-xs-offset-1 col-xs-11" +
            " translation-text pointer container-text" + " " + extra_class),
        image = $(document.createElement('img')).addClass("img-responsive"); // icon-max-size

    if ($.inArray("google", image_path)) {
        image.addClass("google-size");
    }

    // Add image + translation
    $(translation_div).addClass("row margin-left-10px");
    $(image).attr("src", image_path);
    $(text_div).text(translation_text);
    $(image).appendTo(image_div);
    $(translation_div).append(image_div);
    $(translation_div).append(text_div);

    var translation_choice = $("#translation-choice");
    translation_choice.append(translation_div);

    // Add space
    var space_div = document.createElement('div');
    $(space_div).addClass("space7percent");
    translation_choice.append(space_div);
}

function showPlayMode(content) {

    var renderer = new PlayModeRenderer();
    renderer.page.erase();

    var formatter = new TranslationsFormatter({content: content});
    content = formatter.format();

    renderer.page.draw(content);

    var contentGenerator = new ContentGenerator({content: content});
    contentGenerator.generate();

    return content;
}


function showTranslationMode(content) {
    var renderer = new TranslateModeRenderer();
    renderer.page.erase();

    var formatter = new TranslationsFormatter({content: content});
    content = formatter.format();

    renderer.page.draw(content);

    var contentGenerator = new ContentGenerator({content: content});
    contentGenerator.generate();

    return content;
}


/*TODO Refactor this code and adapt to modular architecture*/
function ShowTranslatorsBasedOnTranslation(content, position) {
    var pageRenderer = new PageRenderer();
    pageRenderer.page.erase();

    var imagePathGenerator = new ImagePathGenerator();

    for (var index in content) {
        if (Number(index) === position) {
            var image_path = imagePathGenerator.generate({company: content[index].translator});
            if (content.length > 1) {
                CreateTranslationRow(image_path, content[index].translation, "general-info");
            }
            else {
                CreateTranslationRow(image_path, content[index].translation, "general-text-info");
            }
        }
        else {
            var image_path = imagePathGenerator.generate({company: content[index].translator, color: "grey"});
            CreateTranslationRow(image_path, content[index].translation, "");
        }
    }
}


function UserInterfaceHandler(parameters) {
    var sourceText = parameters.sourceText,
        translateTo = parameters.translateTo,
        translateFrom = parameters.translateFrom;

    function sendIntoTranslationMode() {
        send('/translate');
    }

    function sendIntoPlayMode() {
        send('/play');
    }

    function removeListeners() {
        var elements = document.getElementsByClassName("pointer");
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeEventListener('click',
                function () {
                },
                false);
        }
    }

    function addListeners(content) {
        var elements = document.getElementsByClassName("pointer");

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click',
                function () {

                    var parameters = {this: this, content: content};
                    var userInputProcessor = new UserInputProcessor(parameters);
                    removeListeners();
                },
                false);
        }
    }


    function UserInputProcessor(parameters) {
        var self = parameters.this,
            content = parameters.content;

        var position = -1;
        findClickedTranslationPosition();

        highlightTranslationBasedUserInput();
        saveUserClickedTranslation();

        function findClickedTranslationPosition() {
            var clickedRow = $(self).parent(),
                rows = $('#translation-choice').find('div.row');

            $.each(rows, function (index, row) {
                if (clickedRow.is(row)) {
                    position = index;
                }
            });
        }

        function highlightTranslationBasedUserInput() {
            ShowTranslatorsBasedOnTranslation(content, position);
        }

        function saveUserClickedTranslation() {

            var requestObject = composeRequestObject();
            sendRequestObject();

            function composeRequestObject() {
                var requestObject = {};
                for (var prop in content) {
                    if (content.hasOwnProperty(prop) &&
                        content[prop].hasOwnProperty('translator') &&
                        content[prop].hasOwnProperty('translation')) {
                        requestObject[content[prop]['translator']] = content[prop]['translation'];
                    }
                }

                requestObject['best_translator'] = content[position]['translator'];

                return requestObject;
            }

            function sendRequestObject() {
                /*TODO Check if this check is required*/
                if (content.length > 1) {
                    $.ajax({
                        url: '/',
                        data: JSON.stringify(requestObject, null, '\t'),
                        type: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        success: function (response) {
                            console.info("Application has stored chosen translation successfully.");
                        },
                        error: function (error) {
                            console.warn("Application has failed to store chosen translation.");
                        }
                    });
                }
            }


        }
    }



    function send(url) {
        // Remove spaces, tabs, newlines and etc. from the beginning and end of the string
        if ($.trim(sourceText).length > 0) {
            var pageRenderer = new PageRenderer();
            pageRenderer.loader.draw();

            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    from: translateFrom,
                    to: translateTo,
                    q: sourceText
                },
                cache: false,
                success: function (response) {
                    var response_object = JSON.parse(response);
                    var translations = response_object["translations"];
                    var renderer = new Renderer({content: translations});


                    if (url === '/play') {
                        var content = renderer.renderPlayMode();
                        pageRenderer.loader.erase();
                        addListeners.call(this, content);

                        var playModeRenderer = new PlayModeRenderer();
                        playModeRenderer.page.draw(content);
                    }
                    else {
                        var content = renderer.renderTranslateMode();
                        pageRenderer.loader.erase();

                        var translationModeRenderer = new PlayModeRenderer();
                        translationModeRenderer.page.draw(content);
                    }
                },
                error: function (error) {
                    console.warn("We are sorry. The application error has occurred.");
                    pageRenderer.loader.erase();
                }
            });
        }
    }

    return {
        initiateTranslationModeFlow: sendIntoTranslationMode,
        initiatePlayModeFlow: sendIntoPlayMode
    };
}


function CreateRequestObject() {
    var translateFrom = $('.translate-from').attr('name'),
        translateTo = $('.translate-to').attr('name'),
        sourceText = $('textarea').val();
    return {
        translateFrom: translateFrom,
        translateTo: translateTo,
        sourceText: sourceText
    }
}

$(function () {
    $('#playButton').click(function() {
        var requestObject = new CreateRequestObject();
        var handler = new UserInterfaceHandler(requestObject);
        handler.initiatePlayModeFlow();
    });
});


$(function () {
    $('#translateButton').click(function() {
        var requestObject = new CreateRequestObject();
        var handler = new UserInterfaceHandler(requestObject);
        handler.initiateTranslationModeFlow();
    });
});


$(document).ready(function () {
    var max_text_length = 500;
    $('#translation-textarea-char-counter').html("0/" + max_text_length.toString());

    $('#translation-textarea').keyup(function () {
        var text_length = $('#translation-textarea').val().length;
        $('#translation-textarea-char-counter').html(text_length.toString() + "/" + max_text_length.toString());
    });
});