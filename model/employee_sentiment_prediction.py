import pickle

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

"""
Employee sentiment analysis.
A supervised binary classification algorithm to classify the an employee as "happy" and "unhappy".

As labeled business emails were not available, a subset of openly available IMDB dataset was used
as the mock for analysis. In addition, simulated features are used to demonstrate the core concepts and also
as a support of the development of both backend and frontend development and production deployment.
"""


class MultiColumnLabelEncoder:
    def __init__(self, columns=None):
        self.columns = columns

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        """
        Transforms columns of X specified in self.columns using
        LabelEncoder(). If no columns specified, transforms all
        columns in X.
        """

        output = X.copy()
        if self.columns is not None:
            for col in self.columns:
                le = LabelEncoder()
                le.fit(output[col])
                # print(list(le.classes_))

                output[col] = LabelEncoder().fit_transform(output[col])
        else:
            for colname, col in output.iteritems():
                output[colname] = LabelEncoder().fit_transform(col)
        return output

    def fit_transform(self, X, y=None):
        return self.fit(X, y).transform(X)


# --------------------
# simulate the input data
n = 10000  # total records
num_of_employees = 20
data = {
    'employeeId': np.random.randint(num_of_employees, size=n),
    'workingHours': np.random.normal(8, 1, n),
    'engagement': np.random.choice(['no response', 'not same day', 'same day', 'next day', '> 5 days'], size=n,
                                   p=[0.7, 0.2, 0.1 / 3, 0.1 / 3, 0.1 / 3]),
    'emailBodyTextReceived': np.random.choice(['happy', 'not happy'], size=n, p=[0.8, 0.2]),
    'emailBodyTextSent': np.random.choice(['happy', 'not happy'], size=n, p=[0.8, 0.2]),
    'pressure': np.random.choice(['happy', 'not happy'], size=n, p=[0.8, 0.2]),

    'label': np.random.choice(['HAPPY', 'NOT HAPPY'], size=n, p=[0.8, 0.2])
}
df = pd.DataFrame(data=data)

# filter out one employee
id = 3  # a random employee id
df = df[df['employeeId'] == id]

# rules to define labels association to features
# TODO:

# encode
feature_columns = [
    'engagement',
    'emailBodyTextReceived',
    'emailBodyTextSent',
    'pressure'

]
df = MultiColumnLabelEncoder(
    columns=feature_columns
).fit_transform(df)

# prepare the target
target = 'label'

le = LabelEncoder()
le.fit(df[target])
df[target] = le.transform(df[target])
df[target] = df[target].astype(int)

target_names = le.classes_
feature_columns = [
    'workingHours',
    'engagement',
    'emailBodyTextReceived',
    'emailBodyTextSent',
    'pressure'
]
X = df[feature_columns]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    stratify=y,
    random_state=0
)

# model
# model = XGBClassifier() # need One Hot Encoding
# model.fit(X_train, y_train)

tree = RandomForestClassifier()
tree.fit(X_train, y_train)
y_pred = tree.predict(X_test)

sample = X_test[0:1]
prob = tree.predict_proba(X_test)
print(prob)

# show model performance
# print(tree.predict_proba(X_test[0:10]))
print('Classifier performance:')
print('Accuracy:', accuracy_score(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

print('Classification report:')
print(classification_report(y_test, y_pred))

# dump the model for production deployment
filename = 'model.pkl'
pickle.dump(tree, open(filename, 'wb'))
