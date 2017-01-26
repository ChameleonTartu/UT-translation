#!/usr/bin/python
#  -*- coding: utf-8 -*-

import Queue
import threading

from translators.microsoft import save_microsoft_translation
from translators.google import save_google_translation
from translators.ut import ut_translation


def get_translations(source_text, language_translate_from, language_translate_to, timeout=10, num_translators=3):
    queue = Queue.Queue()
    thread_microsoft = threading.Thread(target=save_microsoft_translation, args=(queue,
                                                                                 source_text,
                                                                                 'client_id',
                                                                                 'client_secret',
                                                                                 language_translate_from,
                                                                                 language_translate_to)
                                        )
    thread_microsoft.daemon = True

    thread_google = threading.Thread(target=save_google_translation, args=(queue,
                                                                           source_text,
                                                                           language_translate_from,
                                                                           language_translate_to)
                                     )
    thread_google.daemon = True

    thread_ut = threading.Thread(target=ut_translation, args=(queue,
                                                              source_text,
                                                              language_translate_from,
                                                              language_translate_to)
                                 )
    thread_ut.daemon = True

    thread_microsoft.start()
    thread_google.start()
    thread_ut.start()

    thread_microsoft.join(timeout=timeout)
    thread_google.join(timeout=timeout)
    thread_ut.join(timeout=timeout)

    translations = dict()

    for _ in xrange(num_translators):
        for key, value in queue.get().iteritems():
            translations[key] = value

    return translations
