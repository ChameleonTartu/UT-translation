#!/usr/bin/python
#  -*- coding: utf-8 -*-

languages_in_estonian = {'et': 'Eesti', 'en': 'Inglise'}
languages_in_english = {'et': 'Estonian', 'en': 'English'}


def get_available_language_culture_name_pairs():
    return [{"et": "en"}, {"en": "et"}]


# TODO How to handle languages which are not in the list, is it possible ?
def language_culture_names_to_estonian(languages_list):
    language_culture_name_to_estonian = dict()
    for languages in languages_list:
        lang_from = languages.keys()[0]
        lang_to = languages.items()[0]

        if lang_from in languages_in_estonian:
            language_culture_name_to_estonian[lang_from] = languages_in_estonian[lang_from]

        if lang_to in languages_in_estonian:
            language_culture_name_to_estonian[lang_to] = languages_in_estonian[lang_to]

    return language_culture_name_to_estonian


def language_culture_names_to_english(languages_list):
    language_culture_name_to_english = dict()
    for languages in languages_list:
        lang_from = languages.keys()[0]
        lang_to = languages.items()[0]

        if lang_from in languages_in_english:
            language_culture_name_to_english[lang_from] = languages_in_english[lang_from]

        if lang_to in languages_in_english:
            language_culture_name_to_english[lang_to] = languages_in_english[lang_to]
    return language_culture_name_to_english
