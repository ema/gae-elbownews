from django.shortcuts import render_to_response

import time
from datetime import datetime
import logging

import feedparser

FEEDS = (
    'http://feeds.bbci.co.uk/news/rss.xml',
    #'http://rss.cnn.com/rss/edition.rss',
    'http://www.businessweek.com/rss/bwdaily.rss',
    'http://rss.slashdot.org/Slashdot/slashdot',
    #'http://feeds.guardian.co.uk/theguardian/rss',
)

def index(request):
    entries = []
    for uri in FEEDS:
        for entry in __get_entries(uri):
            entries.append(entry)

    entries.sort(cmp=lambda x, y: cmp(y['date'], x['date']))
    return render_to_response("main.html", locals())

def __get_entries(feed_uri):
    entries = []

    channels = feedparser.parse(feed_uri)
    for entry in channels.entries:
        entry_dict = {
            'title': entry.title,
            'description': entry.description,
            'link': entry.link,
            'source': channels.feed.title,
        }

        #logging.info(str(entry.keys()))

        try:
            entry_dict['date'] = datetime.fromtimestamp(time.mktime(
                entry.updated_parsed))
        except AttributeError:
            entry_dict['date'] = None

        entries.append(entry_dict)

    return entries
