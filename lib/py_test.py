# This Python file uses the following encoding: utf-8
# -*- coding: utf_8 -*-
import argparse

parser = argparse.ArgumentParser(description='Child_Process Test')
parser.add_argument('--word', type=str, required=False)
parser.add_argument('--num', type=str, required=False)

args = parser.parse_args()
word = args.word
num = args.num

if word :
  print(word)
  if num :
    print(num)
else :
  print('Hello From Python 中文测试')