#!/bin/bash

# Verify that every image in the Images/ folder matches the HTML and vice versa.

 ls Images/Originals | sort > /tmp/originals.txt
 cat index.html | grep -oP "\/Images\/Full\/\K[^\"]+" | sort > /tmp/web.txt

diff /tmp/web.txt /tmp/originals.txt