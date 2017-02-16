#!/usr/bin/python
#  -*- encoding: utf-8 -*-


from microsofttranslator import Translator
import time


def save_microsoft_translation(queue, source_text, client_id, client_secret, translate_from='et', translate_to='en'):
    translation = ''
    try:
        begin = time.time()
        translation = microsoft_translation(source_text,
                                            translate_from=translate_from,
                                            translate_to=translate_to,
                                            client_id=client_id,
                                            client_secret=client_secret)
        end = time.time()
        print("microsoft", translation)
        print("microsoft/time : ", end - begin)

    except Exception as e:
        print("Microsoft failed!", e)

    queue.put({'translation_microsoft': translation})
    return None


def microsoft_translation(text, client_id, client_secret, translate_from='et', translate_to='en'):
    translator = Translator(client_id, client_secret)
    translation = translator.translate(text, from_lang=translate_from, to_lang=translate_to)
    return translation
