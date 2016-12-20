#!/usr/bin/python
#  -*- coding: utf-8 -*-

from flask import Flask, render_template, request

# Translators
from translators.microsoft import save_microsoft_translation
from translators.google import save_google_translation
from translators.ut import ut_translation

from db import insert

import json
import time

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
        translation_microsoft = save_microsoft_translation(source_text,
                                                           'client_id',
                                                           'client_secret',
                                                           language_translate_from,
                                                           language_translate_to)

        translation_google = save_google_translation(source_text,
                                                     language_translate_from,
                                                     language_translate_to)

        translation_ut = ut_translation(source_text)

        # Insert Query in DB
        insert(source_text, translation_microsoft, translation_google, translation_ut)

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
