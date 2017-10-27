#!/usr/bin/python
#  -*- encoding: utf-8 -*-

import sys
sys.path.append('/vhosts/masintolge/masintolge')

from neurotolge import app as application

if __name__ == "__main__":
    application.run(threaded=True)

