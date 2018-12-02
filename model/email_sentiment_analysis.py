import codecs
import collections
import csv
import glob
import os
import string
import sys
import time

import nltk
import numpy as np
import pandas as pd
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import GridSearchCV
from sklearn.neural_network import MLPClassifier
from tqdm import tqdm

print(sys.version)

"""
Email sentiment analysis.
A supervised binary classification algorithm to classify the email text body as "happy" and "unhappy".

As labeled business emails were not available, a subset of openly available IMDB dataset was used
as the mock for analysis.

The results of this analysis are used for the next stage employee sentiment prediction.  
"""

# 1. Read and concatenate data into test and train sets.
# Dataset config
# Use IMDB data as the mocked email body.
SUBSET_MAP = {
    'IMDB': 'train',
}

SUBSET_SIZE = {
    'train': 500,
    'test': 500
}

LABEL_MAP = {
    1: 'happy',
    0: 'not happy'
}

path = r'./input'
print(os.listdir(path))
input_files = glob.glob(path + "/*_labelled.txt")

print("Read input files {}...".format(input_files))
list_ = []
for file_ in input_files:
    df_ = pd.read_csv(
        file_,
        delimiter='\t',
        quoting=csv.QUOTE_NONE,
        header=None,
        names=['text', 'label']
    )
    df_['source'] = file_
    list_.append(df_)
df = pd.concat(list_, ignore_index=True)
assert df.shape == (1000, 2 + 1)

# def split_data(row):
#     subset = 'UNKNOWN'
#     for item in SUBSET_MAP.items():
#         if item[0].lower() in row[-1].lower():
#             subset = item[1]
#     return subset
#
# df['subset'] = df.apply(split_data, axis=1)
#
# assert set(SUBSET_MAP.values()) == set(df['subset'].unique())

# 2. Prepare the data for input into your model.
print("Pre-processing...")
start_time = time.time()

df['text'] = df['text'].apply(lambda x: x.lower())  # lower case

table = str.maketrans({}.fromkeys(string.punctuation))  # remove punctuation
df['text'] = df['text'].apply(lambda x: x.translate(table))

df['text'] = df['text'].apply(nltk.word_tokenize)  # tokenize
print("time taken: {0:.2f} seconds".format(time.time() - start_time))

df_train = df.sample(frac=0.8, random_state=0)
df_test = df.drop(df_train.index)

# 3. load the model
# download the pre-trained word vector from https://fasttext.cc/docs/en/english-vectors.html
f = codecs.open("./input/wiki-news-300d-1M.vec", encoding='utf8')
fasttext_model = {}
for line in tqdm(f):
    values = line.rstrip().rsplit(' ')
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    fasttext_model[word] = coefs
f.close()
print('found %s word vectors' % len(fasttext_model))


# function to convert a sentence to vector
def sentence2vector(sentence, model):
    vector = []
    num_words = 0
    for word in sentence:
        try:
            if num_words == 0:
                vector = model[word]
            else:
                vector = np.add(vector, model[word])
            num_words += 1
        except:
            # print("{} not found".format(word))
            pass

    assert len(vector) != 0
    return np.asarray(vector) / num_words


print('convert text to vectors...')
start_time = time.time()

X_train = []
for i, v in enumerate(df_train['text'].tolist()):
    X_train.append(sentence2vector(v, fasttext_model))

X_test = []
for i, v in enumerate(df_test['text'].tolist()):
    X_test.append(sentence2vector(v, fasttext_model))

print("time taken: {0:.2f} seconds".format(time.time() - start_time))

y_train = df_train['label']
y_test = df_test['label']

# convert text samples to vectors
print('convert text to vectors...')
start_time = time.time()

X_train = []
for i, v in enumerate(df_train['text'].tolist()):
    X_train.append(sentence2vector(v, fasttext_model))

X_test = []
for i, v in enumerate(df_test['text'].tolist()):
    X_test.append(sentence2vector(v, fasttext_model))

print("time taken: {0:.2f} seconds".format(time.time() - start_time))

y_train = df_train['label']
y_test = df_test['label']

start_time = time.time()
clf = GridSearchCV(
    MLPClassifier(max_iter=4, random_state=123),
    param_grid={
        'alpha': [0.1, 0.5],
        'solver': ['adam']
    },
    cv=2
)
clf.fit(X_train, y_train)
print("time taken: {0:.2f} seconds".format(time.time() - start_time))

print(clf.best_estimator_)

# 4. Evaluate your model using metric(s) you see fit and justify your choices.
print("Evaluate ...")
print('Accuracy:', clf.score(X_test, y_test))

print('Confusion matrix:')
y_pred = clf.predict(X_test)
print("Prediction: {}".format(collections.Counter(y_pred)))
print("Actual: {}".format(collections.Counter(y_test)))
print(confusion_matrix(y_test, clf.predict(X_test)))

y_pred = clf.predict(X_test)

print('Classification report:')
print(classification_report(y_test, clf.predict(X_test)))
