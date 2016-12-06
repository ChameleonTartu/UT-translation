from flask import Flask, render_template
from translators.microsoft import microsoft_translation
from translators.google import google_translation

app = Flask(__name__)


# TODO
@app.route('/')
def main_page():
    return "Hello"


# TODO
@app.route('/about')
def about_page():
    return "About"


# TODO
@app.route('/contacts')
def contacts_page():
    return "Contacts"


# TODO: remove debug mode in production
if __name__ == '__main__':
    app.run(debug=True)
