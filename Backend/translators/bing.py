from microsofttranslator import Translator


def bing_translation(text, client_id,
                           client_secret,
                           translate_from='et', translate_to='en'):
    translator = Translator(client_id, client_secret)
    return translator.translate(text, from_lang=translate_from, to_lang=translate_to)


def main():
    #print(bing_translation("Tere hommikust!"))


if __name__ == "__main__":
    main()
