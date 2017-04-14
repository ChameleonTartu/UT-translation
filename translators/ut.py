#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import socket
import datetime
import requests
import json


def ut_translation(queue, source_text, translate_from='et', translate_to='en', connection_timeout=1):
    translation = save_ut_translation(source_text, translate_from, translate_to, connection_timeout)

    queue.put({'translation_ut': translation})
    return


def save_ut_translation(source_text, translate_from='et', translate_to='en', connection_timeout=1):
    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
    print("timestamp/ut")
    print(timestamp)
    translation_time_begin = time.time()
    try:
        url = ""
        if translate_from == "en" and translate_to == "et":
            url = u"https://urgas.ee/sauron/rest/translate/enet?auth=password&src={0}".format(source_text)
        elif translate_from == "et" and translate_to == "en":
            url = u"https://urgas.ee/sauron/rest/translate/eten?fast=1&auth=password&src={0}".format(source_text)

        content = requests.get(url).content
        print "Requests", content
        translation = json.loads(content)["tgt"]

        """
        __HOST__ = "booster2.hpc.ut.ee"
        __PORT__ = 50007
        __BUFFER_SIZE__ = 4096

        delimiter = "|||"
        text_for_translation = u"{source}{delimiter}" \
                               u"{lang_from}{delimiter}{lang_to}".format(source=source_text,
                                                                         delimiter=delimiter,
                                                                         lang_from=translate_from,
                                                                         lang_to=translate_to)

        s = socket.create_connection((__HOST__, __PORT__), timeout=connection_timeout)
        s.send(text_for_translation.encode('utf-8'))

        translation = s.recv(__BUFFER_SIZE__).replace("|||", "")
        s.close()

        print("ut")
        print(unicode(translation).encode('utf-8'))
        """

    except Exception as e:
        translation = ''
        print("ut failed!", e)

    translation_time_end = time.time()
    print("ut/time : ", translation_time_end - translation_time_begin)

    return translation
