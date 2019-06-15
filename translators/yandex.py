#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import os
import time
import datetime
from .abstract_translator import AbstractTranslator
import requests

class Yandex(AbstractTranslator):
    def _add_to_queue(self):
        self.queue.put({'translation_yandex': self.translation})
        return

    def _external_api_integration(self):
        api_key = os.environ.get('YANDEX_API_KEY')
        params = {
            'key' : api_key,
            'text' : self.source_text,
            'lang' : self.translate_from + "-" + self.translate_to
        }
        r = requests.post("https://translate.yandex.net/api/v1.5/tr.json/translate", data=params)
        if r.json()['code'] == 200:
            self.translation = r.json()['text']
        else:
            print("Request: ", r.url)
            print("Response: ", r.json())
        return

    # TODO: Figuring out in logging
    def translate(self):
        # TODO: Refactor time tracking
        timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
        print("timestamp/yandex")
        print(timestamp)
        translation_time_begin = time.time()

        try:
            self._external_api_integration()

            # print("google")
            # TODO: Check if this code is needed?
            # print(unicode(translation).encode('utf-8'))
        except Exception as e:
            print("yandex failed!", e)

        # TODO: Refactor time tracking
        translation_time_end = time.time()
        print("yandex/time : ", translation_time_end - translation_time_begin)

        self._add_to_queue()
        return
