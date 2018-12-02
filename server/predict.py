import json
from sklearn.externals import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Encode class
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
                le = preprocessing.LabelEncoder()
                le.fit(output[col])
                # print(list(le.classes_))

                output[col] = LabelEncoder().fit_transform(output[col])
        else:
            for colname, col in output.iteritems():
                output[colname] = LabelEncoder().fit_transform(col)
        return output

    def fit_transform(self, X, y=None):
        return self.fit(X, y).transform(X)


# Hander
def handler(event, context):
    print(event)
    # Parse json
    body = json.loads(event["body"])

    model = joblib.load('model.pkl')
    print("Loaded Model")
    print(f"Body is: {body}")

    # Attributes
    workingHours = body["workingHours"]
    engagement = body["engagement"]
    emailBodyTextReceived = body["emailBodyTextReceived"]
    emailBodyTextSent = body["emailBodyTextSent"]
    pressure = body["pressure"]

    outcome = model.predict_proba([[workingHours, engagement, emailBodyTextReceived, emailBodyTextSent, pressure]])
    print(outcome)

    predictionResponse = {
        "sentiment": float(outcome[0][0])
    }

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        "body": json.dumps(predictionResponse)
    }

    return response