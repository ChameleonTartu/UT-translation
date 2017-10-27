#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import time
import datetime
from abstract_translator import AbstractTranslator


class Google(AbstractTranslator):
    def _add_to_queue(self):
        self.queue.put({'translation_google': self.translation})
        return

    def _external_api_integration(self):
        # INFO: Integration with Google translator's API



        return

    # TODO: Figuring out in logging
    def translate(self):
        # TODO: Refactor time tracking
        timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S:%f')
        print("timestamp/google")
        print(timestamp)
        translation_time_begin = time.time()

        try:
            self._external_api_integration()

            # print("google")
            # TODO: Check if this code is needed?
            # print(unicode(translation).encode('utf-8'))
        except Exception as e:
            print("google failed!", e)

        # TODO: Refactor time tracking
        translation_time_end = time.time()
        print("google/time : ", translation_time_end - translation_time_begin)

        self._add_to_queue()
        return
