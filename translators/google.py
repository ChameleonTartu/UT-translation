#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import requests
import json
import datetime


# TODO Unify integrations
# TODO Rename
def save_google_translation(queue, source_text, translate_from='et', translate_to='en'):
    translation = ''

    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/google")
    print(timestamp)
    translation_time_begin = time.time()
    try:
        # INFO: Integration with Google translator's API

        translation = google_translation(source_text,
                                         translate_from=translate_from,
                                         translate_to=translate_to)
        print("google")
        print(unicode(translation).encode('utf-8'))

    except Exception as e:
        print("google failed!", e)

    translation_time_end = time.time()

    print("google/time : ", translation_time_end - translation_time_begin)

    queue.put({'translation_google': translation})
    return None


def google_translation(text, translate_from='et', translate_to='en'):
    # INFO: Put your integration here
    translation, url = "", ""

    response = requests.get(url)
    json_response = json.loads(response.text)
    translation = json_response['data']['translations'][0]['translatedText']

    return translation
