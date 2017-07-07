#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import datetime
import requests
import json


def ut_translation(queue, source_text, translate_from='et', translate_to='en'):
    translation = save_ut_translation(source_text, translate_from, translate_to)

    queue.put({'translation_ut': translation})
    return


# TODO Rename to safe
def save_ut_translation(source_text, translate_from='et', translate_to='en'):
    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/ut")
    print(timestamp)
    translation_time_begin = time.time()
    try:
        # INFO: Integration with University of Tartu translator's API
        # INFO: Put your integration here



        if source_text[len(source_text) - 1] != '.' and \
           len(translation) > 0 and \
           translation[len(translation) - 1] == '.':
            translation = translation[:- 1]
    except Exception as e:
        translation = ''
        print("ut failed!", e)

    translation_time_end = time.time()
    print("ut/time : ", translation_time_end - translation_time_begin)
    return translation


def get_ut_translation_object(source_text, translate_from, translate_to):
    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/ut")
    print(timestamp)
    translation_time_begin = time.time()
    try:
        # INFO: Integration with University of Tartu translator's API


    except Exception as e:
        ut_translation_object = {}
        print("ut failed!", e)

    translation_time_end = time.time()
    print("ut/time : ", translation_time_end - translation_time_begin)
    return ut_translation_object
