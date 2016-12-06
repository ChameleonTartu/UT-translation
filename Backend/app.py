from flask import Flask, render_template
from translators.bing import bing_translation

app = Flask(__name__)


@app.route('/')
def main_page():
    translate = bing_translation("Tere")
    print(translate)
    return "Hello"
        #render_template('index_.html')


@app.route('/about')
def about_page():
    return "About"


@app.route('/contacts')
def contacts_page():
    return "Contacts"


if __name__ == '__main__':
    app.run(debug=True)
