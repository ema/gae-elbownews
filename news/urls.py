from django.conf.urls.defaults import *

import views

urlpatterns = patterns('',
     (r'', views.index),
     #(r'', 'direct_to_template', { 'template': 'about.html' }), 
)
