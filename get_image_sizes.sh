#!/bin/bash

# Read the image names out of the HTML, get their dimensions, and produce new HTML.

while read -r image; do
    w=$(file Images/Originals/$image | grep -oP "precision 8, \K[0-9]{4}")
    h=$(file Images/Originals/$image | grep -oP "precision 8, [0-9]{4}x\K[0-9]{4}")

    echo "<a href=\"/Images/Full/$image\" data-pswp-width=\"$w\" data-pswp-height=\"$h\" target=\"_blank\">"
    echo "<img src=\"/Images/Thumbnails/$image\" srcset=\"/Images/Thumbnails2x/$image 2x\" />"
    echo "</a>"
done <<< $(cat index.html | grep "href=\"\/Images\/Full\/\K[^\"]+" -oP)