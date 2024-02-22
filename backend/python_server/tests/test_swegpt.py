import pytest
import sys
import csv

sys.path.append('backend\python_server') 
from swegptmodel import swegpt_handeler
import random


def fix_text(nr_lines, in_path, out_path):
    with open(in_path, 'r', encoding='utf-8') as file:
        lines = [",".join(file.readline().split(",")[:-1]).replace("\"", "") for _ in range(nr_lines+1)][1:]
    
    with open(out_path, 'w', encoding='utf-8', newline='\n') as file:
        writer = csv.writer(file)
        
        for line in lines:
            words = [w.replace("\"", "").replace("\'", "") for w in line.split(" ")]
            num1 = random.randint(0, len(words))
            num2 = random.randint(0, len(words))
            miin, maax = sorted((num1,num2))
            ratio = random.random() * 5 + 0.1
            writer.writerow((words[:miin], words[miin:maax], words[maax:], ratio))
def get_text(nr_lines, path):
    with open(path, 'r', encoding='utf-8') as file:
        lines = [[" ".join(eval(str(t))) if type(t) != float else t  for t in eval(file.readline())] for _ in range(nr_lines+1)][1:]
    return lines
#fix_text(10000,"backend\\python_server\\tests\\sentiment-sv-small.csv", "backend\\python_server\\tests\\fix_text.csv")
TEXTS = get_text(20, "backend\\python_server\\tests\\fix_text.csv")

handeler = swegpt_handeler()

@pytest.mark.parametrize("before, fill, after, ratio", [
    ("", "", "", 1),
    ("hej", "hej", "hej", 1),
    ("", "hej", "hej", 1),
    ("hej", "", "hej", 1),
    ("hej", "hej", "", 1),
    ("", "", "hej", 1),
    ("hej", "", "", 1),
    ("", "hej", "", 1)
    
] + TEXTS)
def test_valid_prob(before, fill, after, ratio):
    prob = handeler.calc_fill_prob(before, fill, after, ratio)
    assert prob <= 1 and prob >= 0 


@pytest.mark.parametrize("before, fill_good, fill_bad, after, ratio",[
    ("Jag brukar äta lunch runt", "klockan halv två", "klockan halv elva", "på eftermiddagen", 1),
    ("Jag brukar äta lunch runt", "klockan halv elva", "klockan halv två", "på förmiddagen", 1),
    ("Jag brukar äta lunch runt", "klockan halv två", "snabb häst", "på förmiddagen", 1)
])
def test_context_understadning(before, fill_good, fill_bad, after, ratio):
    prob_good = handeler.calc_fill_prob(before, fill_good, after, ratio)
    prob_bad = handeler.calc_fill_prob(before, fill_bad, after, ratio)
    assert prob_good > prob_bad