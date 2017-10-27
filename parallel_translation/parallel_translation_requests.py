#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import Queue
import threading

from translators.google import Google
from translators.ut import UT
from translators.tilde import Tilde


def start_thread(object):
    if "translate" in dir(object):
        thread = threading.Thread(target=object.translate)
        thread.daemon = True
        thread.start()
    return


def get_translations(source_text, language_translate_from, language_translate_to, timeout=3, num_translators=3):
    queue = Queue.Queue()
    print("get_translations : language_translate_from", language_translate_from)
    print("get_translations : language_translate_to", language_translate_to)

    google = Google(source_text, language_translate_from, language_translate_to, queue)
    start_thread(google)

    ut = UT(source_text, language_translate_from, language_translate_to, queue)
    start_thread(ut)

    tilde = Tilde(source_text, language_translate_from, language_translate_to, queue)
    start_thread(tilde)

    translations = dict()

    for _ in xrange(num_translators):
        for key, value in queue.get().iteritems():
            translations[key] = value
            queue.task_done()

    return translations
