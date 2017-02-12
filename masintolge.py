#!/usr/bin/python
#  -*- coding: utf-8 -*-

from flask import Flask, render_template, request
import json
import sys

app = Flask(__name__)

"""
@app.route("/")
def hello():
    return "Hello world!"
"""

# Translators
from help.parallel_translation_requests import get_translations

# SQLite3 DB
#from db import insert

from language.available_languages import get_available_language_culture_name_pairs, language_culture_names_to_estonian

app.jinja_env.globals['available_language_pairs'] = get_available_language_culture_name_pairs()
app.jinja_env.globals['language_culture_names_to_estonian'] = \
    language_culture_names_to_estonian(get_available_language_culture_name_pairs())


# TODO
@app.route('/', methods=['GET', 'POST'])
def main_page():
    if request.method == 'POST' and 'source_text' in request.json:
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
                {'translator': 'ut', 'translation': translation_ut},
                {'translator': 'microsoft', 'translation': translation_microsoft}
            ]
        })

    elif request.method == 'POST':
        print(request.json)

        return "OK", 201

    print(request)
    return render_template('index.html')

@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/contacts')
def contacts_page():
    print >> sys.stderr, request.method
    return render_template('contacts.html')


# TODO: remove debug mode in production
if __name__ == '__main__':
    app.run(host='0.0.0.0')#debug=True, processes=10)

