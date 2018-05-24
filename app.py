import sqlalchemy
from sqlalchemy import *
import numpy as np
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, render_template, jsonify, request, redirect
from flask_sqlalchemy import sqlalchemy

engine = create_engine("sqlite:///db/belly_button_biodiversity.sqlite")
Base = automap_base()
Base.prepare(engine, reflect = True)

otu = Base.classes.otu
m_data = Base.classes.samples_metadata
names = Base.classes.samples
session = Session(engine)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/name")
def name_api():
    names1 = []
    results = session.query(names).first().__dict__
    for key in results.keys():
        names1.append(key)
    
    names2 = []
    for name in names1:
        if name[0:3] == "BB_":
            boo = name.split("_")
            names2.append(int(boo[1]))

    names3 = sorted(names2)

    all_names = []
    for n in names3:
        all_names.append(f"BB_{n}")

    return jsonify(all_names)



@app.route("/otu")
def otu_api():
    results = session.query(otu.otu_id, otu.lowest_taxonomic_unit_found).all()
    all_otu = []
    for result in results:
        all_otu.append(result[1])
    
    return jsonify(all_otu)



@app.route("/metadata/<sample>")
def metadata(sample):
    if sample[0:3] == "BB_":
        s_number = sample.split("_")
        s_number1 = int(s_number[1])
        results = session.query(m_data.AGE, m_data.BBTYPE, m_data.ETHNICITY, m_data.GENDER, m_data.LOCATION, m_data.SAMPLEID).filter(s_number1 == m_data.SAMPLEID).all()

    for result in results:
        search_dict = {}
        search_dict["AGE"] = result[0]
        search_dict["BBTYPE"] = result[1]
        search_dict["ETHNICITY"] = result[2]
        search_dict["GENDER"] = result[3]
        search_dict["LOCATION"] = result[4]
        search_dict["SAMPLEID"] = result[5]

    return jsonify(search_dict)



@app.route("/wfreq/<sample>")
def wfreq(sample):
    if sample[0:3] == "BB_":
        s_number = sample.split("_")
        s_number1 = int(s_number[1])
        results = session.query(m_data.SAMPLEID, m_data.WFREQ).filter(s_number1 == m_data.SAMPLEID).all()
   
    for result in results:
        freq_d = {}
        freq_d["SAMPLEID"] = result[0]
        freq_d["WFREQ"] = result[1]
    
    return jsonify(freq_d)
    


@app.route("/samples/<sample>")
def samples(sample):
    search_term = []
    search_term.append(sample)
    c = session.query(select(from_obj=names, columns=search_term)).all()
    df1 = pd.DataFrame(c, columns = [sample])
    
    results = session.query(names.otu_id).all()
    df2 = pd.DataFrame(results, columns=["otu_id"])

    df = pd.concat([df1, df2], axis=1, join="inner")
    store = df.sort_values(by=sample, ascending=False)
    stored = store[(store!=0)]
    stored = stored.dropna().astype(int)

    samples_dict = {
        "otu_ids" : stored["otu_id"].values.tolist(), 
        "sample_values" : stored[sample].values.tolist()
    }

    return jsonify(samples_dict)
    

if __name__ == '__main__':
	app.run(debug = True)

