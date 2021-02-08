#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import queue
import threading

from translators.google import Google
from translators.ut import UT
from translators.tilde import Tilde
from translators.yandex import Yandex


def start_thread(object):
    if "translate" in dir(object):
        thread = threading.Thread(target=object.translate)
        thread.daemon = True
        thread.start()
    return


def get_translations(source_text, language_translate_from, language_translate_to, timeout=3, num_translators=4):
    q = queue.Queue()
    print("get_translations : language_translate_from", language_translate_from)
    print("get_translations : language_translate_to", language_translate_to)

    google = Google(source_text, language_translate_from, language_translate_to, q)
    start_thread(google)

    ut = UT(source_text, language_translate_from, language_translate_to, q)
    start_thread(ut)

    tilde = Tilde(source_text, language_translate_from, language_translate_to, q)
    start_thread(tilde)

    yandex = Yandex(source_text, language_translate_from, language_translate_to, q)
    start_thread(yandex)

    translations = dict()

    for _ in range(num_translators):
        for key, value in q.get().items():
            translations[key] = value
            q.task_done()

    return translations
