#!/usr/bin/python
#  -*- coding: utf-8 -*-

from microsofttranslator import Translator


def microsoft_translation(text, client_id,client_secret, translate_from='et', translate_to='en'):
    translator = Translator(client_id, client_secret)
    translation = translator.translate(text, from_lang=translate_from, to_lang=translate_to)
    return translation


def main():
    #print(bing_translation("Tere hommikust!"))
    return None


if __name__ == "__main__":
    main()
