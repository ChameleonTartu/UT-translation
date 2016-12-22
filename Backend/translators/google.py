#!/usr/bin/python
#  -*- coding: utf-8 -*-

import goslate
import time


def save_google_translation(queue, source_text, client_id, client_secret, translate_from='et', translate_to='en'):
    translation = ''

    try:
        begin = time.time()
        translation = google_translation(source_text,
                                         translate_from=translate_from,
                                         translate_to=translate_to)
        end = time.time()
        print("Google", end - begin)

    except Exception as e:
        print("Google failed!", e)

    queue.put({'translation_google': translation})
    return None


def google_translation(text, translate_from='et', translate_to='en'):
    translator = goslate.Goslate()
    translation = translator.translate(text, source_language=translate_from, target_language=translate_to)
    return translation


def main():
    print(google_translation("Tere hommikust"))
    return None


if __name__ == "__main__":
    main()
