# This Python file uses the following encoding: utf-8
# -*- coding: utf_8 -*-
import argparse

parser = argparse.ArgumentParser(description='Child_Process Test')
parser.add_argument('--word', type=str, required=False)

args = parser.parse_args()
word = args.word

if word :
  print(word)
else :
  print('Hello From Python 中文测试')