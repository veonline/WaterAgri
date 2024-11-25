import json
import requests
import numpy as np
import time
import config as config;

access_token=config.access_token; 
def send_data(station_id, date, data):
    reqUrl = "https://meteo.agricolus.com/api/meteo/measures"
    headersList = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": access_token 
    }
    payload = json.dumps({
        "stationId": station_id,
        "date": date,
        "datas": data
    })

    response = requests.request("POST", reqUrl, data=payload,  headers=headersList)
    if(response.status_code!=200):
        print(response.text)


# date="2021-01-01T20:00:00+00:00"
# tmin=1.278116
# tmax=1.513681 
# tavg=1.395899


station_id="0c91beeb-f509-4ef7-9547-22d67b93edb0"

data = np.genfromtxt('working/de.csv', dtype=None, delimiter=',', names=True)
num=0
for d in data:
    date=str(d["hour"].decode("utf-8") )
    print(date)
    tmin=d["tmin"]
    tavg=d["tmean"]
    tmax=d["tmax"]
    psum=d["psum"]

    rhmin=d["ahmin"]
    rhavg=d["ahmean"]
    rhmax=d["ahmax"]

    data=[]

    if(tavg!=False):
        data.append({ 
            "sensorName": "Temperature",
            "average": tavg, 
            "minimum": tmin, 
            "maximum": tmax
        })

    if(psum!=False):
        if(psum<0):
            psum=0
        data.append({ 
            "sensorName": "Precipitations",
            "sum": psum
        })

    if(rhavg!=False):
        data.append({ 
            "sensorName": "RelativeHumidity",
            "average": rhavg, 
            "minimum": rhmin, 
            "maximum": rhmax
        })

    if(len(data)>0):
        send_data(station_id, date, data)
    else:
        print("Skip")

    time.sleep(0.4)

    # num=num+1
    # if(num>10):
    #     break