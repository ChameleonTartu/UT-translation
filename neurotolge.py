#!/usr/bin/python
#  -*- encoding: utf-8 -*-


from flask import Flask, render_template, request
import json
import time

app = Flask(__name__)
app.secret_key = 'neurotolge_tartu'
app_default_language = 'et'

from parallel_translation.parallel_translation_requests import get_translations
from language.available_languages import get_available_language_culture_name_dicts, culture_names
from translators.ut import UT
from werkzeug.exceptions import BadRequestKeyError


app.jinja_env.globals['available_language_pairs'] = get_available_language_culture_name_dicts()

app.jinja_env.globals['language_culture_names_to_estonian'] = culture_names(language='et')
app.jinja_env.globals['language_culture_names_to_english'] = culture_names(language='en')


# TODO This logic should be rewritten later
@app.route('/', methods=['GET', 'POST'])
def main_page(default_language=app_default_language):
    if request.method == 'POST' and 'source_text' in request.json:
        language_translate_from = request.json['translate_from']
        language_translate_to = request.json['translate_to']
        source_text = request.json['source_text']

        print("text for translation")
        print(unicode(source_text).encode('utf-8'))
        print("language translate from :", language_translate_from)
        print("language translate to :", language_translate_to)

        start_translation_time = time.time()
        translations = get_translations(source_text, language_translate_from, language_translate_to)
        translation_google = translations['translation_google']
        translation_microsoft = translations['translation_microsoft']
        translation_ut = translations['translation_ut']
        end_translation_time = time.time()
        print("Total translation time : ", end_translation_time - start_translation_time)

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
        # TODO Create json which will return message to user
        return "OK", 201

    return render_template('index-{lang}.html'.format(lang=default_language))


@app.route("/play", methods=['GET'])
def play():
    request_args = request.args
    print("Play request arguments :", request_args)

    translation_google = ''
    translation_tilde = ''
    translation_ut = ''
    start_translation_time = time.time()
    try:
        language_translate_from = request_args['from']
        language_translate_to = request_args['to']
        source_text = request_args['q']

        translations = get_translations(source_text, language_translate_from, language_translate_to)

        translation_google = translations['translation_google']
        translation_tilde = translations['translation_tilde']
        translation_ut = translations['translation_ut']

        print({"from": language_translate_from,
               "to": language_translate_to,
               "source_text": source_text})

        print({"google": translation_google,
               "tilde": translation_tilde,
               "ut": translation_ut})

    except BadRequestKeyError as e:
        print("BadRequestKeyError occurred: ", e.message)

    end_translation_time = time.time()
    print("Total translation time : ", end_translation_time - start_translation_time)

    if translation_google == '' and translation_tilde == '' and translation_ut == '':
        return json.dumps({
            'success': False
        })

    return json.dumps({
        'success': True,
        'translations': [
            {'translator': 'google', 'translation': translation_google},
            {'translator': 'tilde', 'translation': translation_tilde},
            {'translator': 'ut', 'translation': translation_ut}
        ],
        'source': request_args['q']
    })


# TODO Add time tracking
@app.route("/translate", methods=['GET'])
def translate():
    request_args = request.args

    ut_translation = ""
    try:
        language_translate_from = request_args['from']
        language_translate_to = request_args['to']
        source_text = request_args['q']

        print({"from": language_translate_from,
               "to": language_translate_to,
               "source_text": source_text})
        ut = UT(source_text, language_translate_from, language_translate_to)
        ut_translation = ut.get_translation()
    except BadRequestKeyError as e:
        print("BadRequestKeyError occurred: ", e.message)

    print("UT translation", ut_translation)

    if ut_translation == "":
        return json.dumps({
            'error': True
        })

    return json.dumps({
        'success': True,
        'translations': [
            {'translator': 'ut', 'translation': ut_translation}
        ]
    })
    """
        ,
        'alignweights': ut_translation_object["alignweights"],
        'src': ut_translation_object["src"],
        'rawTgt': ut_translation_object["rawTgt"]
    """


@app.route('/<language>', methods=['GET'])
def get_main_page(language, default_language=app_default_language):
    try:
        return render_template('index-{lang}.html'.format(lang=language))
    except Exception as e:
        print("Page was not found. Move to default.", e.message)
        return render_template('index-{lang}.html'.format(lang=default_language))


@app.route('/about/<language>', methods=['GET'])
def about_page_estonian(language, default_language=app_default_language):
    try:
        return render_template('about-{lang}.html'.format(lang=language))
    except Exception as e:
        print("Page was not found. Move to default.", e.message)
        return render_template('about-{lang}.html'.format(lang=default_language))


@app.route('/error/<language>', methods=['GET'])
def errors_page_estonian(language, default_language=app_default_language):
    try:
        return render_template('error-{lang}.html'.format(lang=language))
    except Exception as e:
        print("Page was not found. Move to default.", e.message)
        return render_template('error-{lang}.html'.format(lang=default_language))

if __name__ == '__main__':
    app.run(host='0.0.0.0')
