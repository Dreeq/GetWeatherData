#!/usr/bin/python3

"""
Cleans the cities500.txt so it only containes city names.
1. Download cities500.zip from https://download.geonames.org/export/dump/
2. Unpack and put the cities500.txt in resources folder.
3. Run this script.
"""

import re

with open('../resources/cities500.txt', 'r+', encoding="UTF8") as file:
    lines = file.readlines()

PATTERN = r'^\d+\s(.+?)(\s|\t)'

modified_lines = []
for line in lines:
    modified_line_match = re.search(PATTERN, line)
    if modified_line_match:
        modified_line = modified_line_match.group(1).strip()
        modified_line = modified_line + "\n"
        modified_lines.append(modified_line)
    else:
        modified_lines.append(line)

modified_lines = list(set(modified_lines))

with open('../resources/cities500.txt', 'r+', encoding="UTF8") as file:
    file.truncate(0)
    file.writelines(modified_lines)
