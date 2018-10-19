#!/bin/bash
set -e
# Walks through CodingChallenges and prepends zeros on them

# CodingChallenges
for i in $(find CodingChallenges/ -maxdepth 1 -name CC_\* | cut -b 21-)
do
	echo "Renaming CC_$i => CC_0$i"
	grep -rInEl $i . | xargs -r -L 1 -o sed -i -e "s/CC_$i/CC_0$i/g"
	mv "CodingChallenges/CC_$i" "CodingChallenges/CC_0$i"
	for f in $(find "CodingChallenges/CC_0$i/" -depth -name "CC_$i*")
	do
		echo "Renaming sub-file $f"
		mv "$f" "`echo $f | sed -re s/\(.*\)CC_$i/\\\\1CC_0$i/`"
	done
done

# _CodingChallenges
for i in $(find _CodingChallenges/ -maxdepth 1 -name [0-9]* | cut -b 19- | sed 's/.md$//')
do
	echo "Renaming $i => 0$i"
	grep -rInEl $i . | xargs -r -L 1 -o sed -i -e "s/$i/0$i/g"
	mv "_CodingChallenges/$i.md" "_CodingChallenges/0$i.md"
	sed -i "3iredirect_from: CodingChallenges/$i.html" "_CodingChallenges/0$i.md"
done
