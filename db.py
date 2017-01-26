#!/usr/bin/python
#  -*- coding: utf-8 -*-

import sqlite3

def insert(text, translation_microsoft, translation_google, translation_ut, choice=0):
    db_connection = sqlite3.connect('translation.db')
    sql = "insert into translation (SOURCE_TEXT, TRANSLATION_MICROSOFT, TRANSLATION_GOOGLE, TRANSLATION_UT, CHOICE) " \
          "values (?,?,?,?,?)"
    parameters = [text, translation_microsoft, translation_google, translation_ut, choice]
    db_connection.execute(sql, parameters)
    db_connection.commit()
    db_connection.close()
    return None
