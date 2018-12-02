# DV AI Hack - Humany

Humany is a human resources management platform that helps medium to large businesses manage and optimise the health of their employees.

[Preview Link](https://dv-hacks.netlify.com)

## The details
### Model

#### Languages
- Python (3.6)

#### Libraries
- numpy
- pandas
- sklearn
- xgboost
- fasttext
- csv
- nltk
- matplotlib

#### Dataset
  The email text bodies were simulated based on IMDB comments; Additional features were also simulated for the binary classification model.

#### how to build the application
  Use script  “email_sentiment_analysis.py” to load emails in CSV files and applies sentimental analysis to classify each individual
 email as “Happy” or “Not happy” based on the text body.
 Subsequently, the labels classified from the text will be used as a feature with other features in the script “employee_sentiment_prediction.py”  from the business data to build another machine model for employee sentimental analysis. Due to the tight time constraint, the author apologise for not being able to glue the two scripts for a further consistent work.

#### how can i extend the dataset if I need to?
  The script “email_sentiment_analysis.py” loads a csv file of labeled text as the input.  Other labeled text datasets in CSV file can be used as the input to train the model.  Note that the script uses Facebook library fastText and runs a Multi-layer Perceptron and may take several minutes to build the model. The dataset in the script “employee_sentiment_prediction.py” is simulated and self-contained. Extension of the dataset can be achieved by simple configuration in the script or by a trivial modification to load data from files.

#### What is the machine learning model?
  Classification by DecisionTree, Multi-layer Perceptron


### Client
#### Languages
The web front-end is using JavaScript (es6), SCSS, HTML, JSON,

### Libraries
Major libraries include the following:
- React
- Redux
- React Router
- React Router redux
- Highcharts
- Webpack

The Redux implementation follows the [Ducks Proposal](https://github.com/erikras/ducks-modular-redux)

#### Build Application
The application requires node and npm to be installed

To start development in watch mode run the following command
```npm run start```

To build for production
```npm run build```

To view stats about the build
```npm run stats```

#### Hosting
Client hosting is ran through Netlify, there's a deploy script used. Ideally this would be setup as part of the CI/CD process

To deploy to Netlify 
```npm run deploy```


### Server
The server is running on AWS using the "Serverless framework"

Ensure you have Serverless installed and account credentials


#### Languages 
Python / YML (Yay for YML)

### Libraries 
 - scikit-learn

### Build/Run Application
To deploy the server, run the following commend

```
 sls deploy
```


