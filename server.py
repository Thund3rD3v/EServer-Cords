import json
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

databaseFile = open('database.json')
databaseData = json.load(databaseFile)


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/database')
def database():
    databaseFile = open('database.json')
    databaseData = json.load(databaseFile)

    return databaseData


@app.route('/add', methods=['POST'])
def add():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        jsonData = request.json
        newData = databaseData.copy()
        newData["places"].append(jsonData)

        with open('database.json', 'w') as f:
            json.dump(newData, f)

        return 'Done!'
    else:
        return 'Content-Type not supported!'


if __name__ == "__main__":
    app.run("localhost", 3000)
