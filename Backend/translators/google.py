#!/usr/bin/python
#  -*- coding: utf-8 -*-

import goslate


def google_translation(text, translate_from='et', translate_to='en'):
    translator = goslate.Goslate()
    translation = translator.translate(text, source_language=translate_from, target_language=translate_to)
    return translation


def main():
    print(google_translation("Tere hommikust"))
    return None


if __name__ == "__main__":
    main()
