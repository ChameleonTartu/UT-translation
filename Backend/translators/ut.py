#!/usr/bin/python
#  -*- coding: utf-8 -*-

from celery import task

#@task
def ut_translation(text, translate_from='et', translate_to='en'):
    # translator = Translator(client_id, client_secret)
    # translation = translator.translate(text, from_lang=translate_from, to_lang=translate_to)
    return text


def main():
    return None


if __name__ == "__main__":
    main()
