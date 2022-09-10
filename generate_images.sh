#!/bin/bash

# Iterates through all photos in Originals/ and resizes them for web.

shopt -s globstar
for f in Images/Originals/*.jpg; do

    name=$(basename $f)
    [ ! -f "Images/Thumbnails/$name" ] && convert $f -resize x300 -quality 90% "Images/Thumbnails/$name"
    [ ! -f "Images/Thumbnails2x/$name" ] && convert $f -resize x600 -quality 90% "Images/Thumbnails2x/$name"
    [ ! -f "Images/Full/$name" ] && convert $f -quality 90% "Images/Full/$name"

    echo "Created all sizes for $name"
done