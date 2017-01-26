#!/usr/bin/python
#  -*- coding: utf-8 -*-


import time
import requests


def ut_translation(queue, text, translate_from='et', translate_to='en'):
    try:
        # 1. Do POST request

        delimiter = "|||"
        text_for_translation = u"%s%s%s%s%s" % (text.encode("utf-8"),
                                                delimiter,
                                                translate_from.encode("utf-8"),
                                                delimiter,
                                                translate_to.encode("utf-8"))

        translation = requests.get("http://masintolge.cs.ut.ee:80/?t=%s" % text_for_translation)
        translation = translation.text.replace("|||", "")

        print("ut", translation)
    except Exception as e:
        print("ut exception", e.message)
        translation = ""


    """
    try:
        proxy = xmlrpclib.ServerProxy("http://localhost:8000/") # TODO: change url to the proper one
        translator = xmlrpclib.MultiCall(proxy)
        translation = translator.translate(text, translate_from, translate_to)

    except Exception as e:
        translation = ""
    """

    queue.put({'translation_ut': translation})
    return None


def main():
    return None


if __name__ == "__main__":
    main()
