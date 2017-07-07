#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import datetime
import requests


def tilde_translation(queue, source_text, translate_from='et', translate_to='en'):
    translation = save_tilde_translation(source_text, translate_from, translate_to)

    queue.put({'translation_tilde': translation})
    return


# TODO Temporary class for production
class ValidationError(Exception):
    def __init__(self, message, errors):
        super(ValidationError, self).__init__(message)
        self.errors = errors


# TODO Rename
def save_tilde_translation(source_text, translate_from='et', translate_to='en'):
    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/tilde")
    print(timestamp)
    translation_time_begin = time.time()
    translation = ''
    try:
        # INFO: Integration with Tilde translator's API
        # INFO: Put your integration here

    except Exception as e:
        print("tilde failed!", e)

    translation_time_end = time.time()
    print("tilde/time : ", translation_time_end - translation_time_begin)
    return translation
