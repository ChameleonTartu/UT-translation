#!/usr/bin/python
#  -*- coding: utf-8 -*-

from flask import Flask, render_template
from celery import Celery, task

# Translators
from translators.microsoft import microsoft_translation
from translators.google import google_translation
from translators.ut import ut_translation

from db import insert

import time

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)


# TODO
@app.route('/', methods=['GET', 'POST'])
def main_page():
    source_text = u"Heakene küll, oleks see siis olnud Jimmy. Ühes Ameerika telekanalis on selline naljamees, Jimmy Fallon. Räägitakse, et on terane poiss. Tema sõnade peale oleks Trump ehk naernudki. On ju naljakas, kui koomik üliriigi liidrile head nõu annab."

    # TODO refactor begin
    translation_microsoft = ""
    try:
        begin = time.time()
        # Hidden credentials:
        translation_microsoft = microsoft_translation(source_text, client_id="****", client_secret="****")
        end = time.time()
        print("Microsoft", end - begin)
    except:
        pass

    translation_google = ""
    try:
        begin = time.time()
        translation_google = google_translation(source_text)
        end = time.time()
        print("Google", end - begin)
    except:
        pass

    translation_ut = ut_translation(source_text)
    # TODO refactor end

    # Insert Query in DB
    insert(source_text, translation_microsoft, translation_google, translation_ut)

    return render_template('index.html')


# TODO
@app.route('/about')
def about_page():
    return render_template('about.html')


# TODO
@app.route('/contacts')
def contacts_page():
    return render_template('contacts.html')


# TODO: remove debug mode in production
if __name__ == '__main__':
    app.run(debug=True)
