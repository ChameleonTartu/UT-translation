#!/usr/bin/python
#  -*- coding: utf-8 -*-


def ut_translation(queue, text, translate_from='et', translate_to='en'):
    # translator = Translator(client_id, client_secret)
    # translation = translator.translate(text, from_lang=translate_from, to_lang=translate_to)

    translation = ""
    queue.put({'translation_ut': translation})
    return None


def main():
    return None


if __name__ == "__main__":
    main()
