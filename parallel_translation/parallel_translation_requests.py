#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import Queue
import threading

from translators.microsoft import save_microsoft_translation
from translators.google import save_google_translation
from translators.ut import ut_translation
from translators.tilde import tilde_translation


def get_translations(source_text, language_translate_from, language_translate_to, timeout=3, num_translators=3):
    queue = Queue.Queue()
    print("get_translations : language_translate_from", language_translate_from)
    print("get_translations : language_translate_to", language_translate_to)

    """
    thread_microsoft = threading.Thread(target=save_microsoft_translation, args=(queue,
                                                                                 source_text,
                                                                                 'MarkTranslationAPI1',
                                                                                 '+9S5n0BWNA27XgZrJysgtNrGgYRK1irG4pu9bpYBWw4=',
                                                                                 language_translate_from,
                                                                                 language_translate_to)
                                        )
    thread_microsoft.daemon = True
    thread_microsoft.start()
    """

    thread_google = threading.Thread(target=save_google_translation, args=(queue,
                                                                           source_text,
                                                                           language_translate_from,
                                                                           language_translate_to)
                                     )
    thread_google.daemon = True
    thread_google.start()

    thread_ut = threading.Thread(target=ut_translation, args=(queue,
                                                              source_text,
                                                              language_translate_from,
                                                              language_translate_to)
                                 )
    thread_ut.daemon = True
    thread_ut.start()

    thread_tilde = threading.Thread(target=tilde_translation, args=(queue,
                                                              source_text,
                                                              language_translate_from,
                                                              language_translate_to)
                                 )

    thread_tilde.daemon = True
    thread_tilde.start()

    translations = dict()

    for _ in xrange(num_translators):
        for key, value in queue.get().iteritems():
            translations[key] = value
            queue.task_done()

    return translations
