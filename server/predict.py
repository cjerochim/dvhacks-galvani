import json
from sklearn.externals import joblib

def handler(event, context):
    print(event)
    body = json.loads(event["body"])

    model = joblib.load('model.pkl')
    print("Loaded Model")
    print(f"Body is: {body}")

    workingHours = body["workingHours"]
    engagement = body["engagement"]
    emailBodyTextReceived = body["emailBodyTextReceived"]
    emailBodyTextSent = body["emailBodyTextSent"]
    pressure = body["pressure"]

    outcome = model.predict_proba([[workingHours, engagement, emailBodyTextReceived, emailBodyTextSent, pressure]])
    print(outcome)

    predictionResponse = {
        "sentiment": outcome
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