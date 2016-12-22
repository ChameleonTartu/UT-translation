#!/usr/bin/python
#  -*- coding: utf-8 -*-

from flask import Flask, render_template, request

# Translators

from help.parallel_translation_requests import get_translations
from db import insert

import json

app = Flask(__name__)


# TODO
@app.route('/', methods=['GET', 'POST'])
def main_page():
    if request.method == 'POST':
        language_translate_from = request.json['translate_from']
        language_translate_to = request.json['translate_to']
        source_text = request.json['source_text']

        # TODO refactor
        # Hidden credentials:

        translations = get_translations(source_text, language_translate_from, language_translate_to)
        translation_google = translations['translation_google']
        translation_microsoft = translations['translation_microsoft']
        translation_ut = translations['translation_ut']

        # Insert Query in DB
        # insert(source_text, translation_microsoft, translation_google, translation_ut)

        return json.dumps({
            'status': 'OK',
            'translations': [
                {'translator': 'google', 'translation': translation_google},
                {'translator': 'microsoft', 'translation': translation_microsoft},
                {'translator': 'ut', 'translation': translation_ut}
            ]
        })

    print(request)
    return render_template('index.html')


@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/contacts')
def contacts_page():
    return render_template('contacts.html')


# TODO: remove debug mode in production
if __name__ == '__main__':
    app.run(debug=True, processes=10)
