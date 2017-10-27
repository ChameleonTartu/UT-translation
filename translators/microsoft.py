#!/usr/bin/python
#  -*- encoding: utf-8 -*-


# from microsofttranslator import Translator
import time
import datetime

# TODO: Refactor as Tilde, Google and UT translators
def save_microsoft_translation(queue, source_text, client_id, client_secret, translate_from='et', translate_to='en'):
    translation = ''

    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/microsoft")
    print(timestamp)
    translation_time_begin = time.time()
    try:
        translation = microsoft_translation(source_text,
                                            translate_from=translate_from,
                                            translate_to=translate_to,
                                            client_id=client_id,
                                            client_secret=client_secret)
        print("microsoft")
        print(unicode(translation).encode('utf-8'))

    except Exception as e:
        print("microsoft failed!", e)

    translation_time_end = time.time()
    print("microsoft/time : ", translation_time_end - translation_time_begin)

    queue.put({'translation_microsoft': translation})
    return None


def microsoft_translation(text, client_id, client_secret, translate_from='et', translate_to='en'):
    translation = ""
    # NOTE: Integration with Microsoft translator
    # translator = Translator(client_id, client_secret)
    # translation = translator.translate(text, from_lang=translate_from, to_lang=translate_to)
    #
    return translation
