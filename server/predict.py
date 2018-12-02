import json
from sklearn.externals import joblib
from sklearn.preprocessing import LabelEncoder


# Hander
def handler(event, context):
    print(event)
    # Parse json
    body = json.loads(event["body"])

    model = joblib.load('model.pkl')
    print("Loaded Model")
    print(f"Body is: {body}")

    # encode values
    workingHours = body["workingHours"]

    le = LabelEncoder()
    le.fit(['no response', 'not same day', 'same day', 'next day', '> 5 days'])
    engagement = le.transform([body["engagement"]])

    le.fit(['happy', 'not happy'])
    emailBodyTextReceived = le.transform([body["emailBodyTextReceived"]])

    le.fit(['happy', 'not happy'])
    emailBodyTextSent = le.transform([body["emailBodyTextSent"]])

    le.fit(['happy', 'not happy'])
    pressure = le.transform([body["pressure"]])

    # make prediction
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