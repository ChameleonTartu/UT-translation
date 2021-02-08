#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import datetime
from .abstract_translator import AbstractTranslator


class UT(AbstractTranslator):
    def __init__(self, source_text, translate_from, translate_to, queue=None):
        AbstractTranslator.__init__(self, source_text, translate_from, translate_to, queue)
        self.translation_object = {}

    def _add_to_queue(self):
        self.queue.put({'translation_ut': self.translation})
        return

    def _external_api_integration(self):
        # INFO: Integration with University of Tartu translator's API






        return

    def translate(self):
        # TODO: Refactor logging!
        timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
        print("timestamp/ut")
        print(timestamp)
        translation_time_begin = time.time()

        try:
            self._external_api_integration()
        except Exception as e:
            print("ut failed!", e)

        translation_time_end = time.time()
        print("ut/time : ", translation_time_end - translation_time_begin)

        self._add_to_queue()
        return

    def get_translation_object(self):
        try:
            self._external_api_integration()
        except Exception as e:
            print(e.message)

        return self.translation_object
