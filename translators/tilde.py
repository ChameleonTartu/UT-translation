#!/usr/bin/python
#  -*- encoding: utf-8 -*-


import time
import datetime
from .abstract_translator import AbstractTranslator

class Tilde(AbstractTranslator):
    class ValidationError(Exception):
        def __init__(self, message, errors):
            Exception.__init__(self, message)
            self.errors = errors

    def _add_to_queue(self):
        self.queue.put({'translation_tilde': self.translation})
        return

    def _external_api_integration(self):
        # INFO: Integration with Tilde translator's API




        return

    def translate(self):
        # TODO: Refactor logging
        timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
        print("timestamp/tilde")
        print(timestamp)
        translation_time_begin = time.time()

        try:
            self._external_api_integration()
        except Exception as e:
            print("tilde failed!", e)

        translation_time_end = time.time()
        print("tilde/time : ", translation_time_end - translation_time_begin)

        self._add_to_queue()
        return
