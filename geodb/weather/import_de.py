from org.fzj.ibg3.sos.client.sosclient import GetObservation
from org.fzj.ibg3.sos.client.sos_result_data_format import getFormatter
import os
import sys
import config as config;
if sys.version_info[0] < 3:
    from StringIO import StringIO
else:
    from io import StringIO
import pandas as pd
import numpy as np

path=os.path.dirname(os.path.abspath(__file__))


def import_de(con):

    host = con['host']
    port = con['port']
    url = con['url']
    _bearerToken=con['_bearerToken']
    offering = "Public"
    starttime = "2022-01-01T00:00:00"
    endtime = "202-12-31T01:00:00"
    stations = "SE_EC_001"
    resultmodel = "om:Observation"
    parameters = "AirTemperature_2m_Avg30min,Precipitation_Cum10min_TB,SoilTemperature_0.01mAvg10min,SoilTemperature_0.04mAvg10min,SoilTemperature_0.05mAvg10mi,SoilWaterContent_0.02m_Avg10min_Sensor2|SoilWaterContent_0.2m_Avg10min_Sensor1,WindDirection_2mAvg10min,WindSpeed_2m_Avg10min,Radiation_Global_Avg10min,AirHumidity_Absolute_2m_Avg10min"
    verbose=1


    #Time,feature,AirTemperature_2m_Avg30min in [degC],AirTemperature_2m_Avg30minQualityFlag in [],Precipitation_Cum10min_TB in [mm],Precipitation_Cum10min_TBQualityFlag in [],SoilTemperature_0.01mAvg10min in [degC],SoilTemperature_0.01mAvg10minQualityFlag in [],SoilTemperature_0.04mAvg10min in [degC],SoilTemperature_0.04mAvg10minQualityFlag in [],WindDirection_2mAvg10min in [degN],WindDirection_2mAvg10minQualityFlag in [],WindSpeed_2m_Avg10min in [m*s-1],WindSpeed_2m_Avg10minQualityFlag in []

    srs = "EPSG:4326"
    spsrs="EPSG:4326"
    x=None
    y=None
    proxyHostname=None
    proxyPort=None
    thematicFilter=None


    p=parameters.split(",");
    getObs = GetObservation(host, port, url, offering, starttime,
         endtime,
         stations.split(","),
         p,
         srs="urn:ogc:def:crs:%s" % (srs,),
         spatialFilterSrs="urn:ogc:def:crs:%s" % (spsrs,), x=x, y=y,
         resultModel=resultmodel,
         proxyHost=proxyHostname, proxyPort=proxyPort, verbose=verbose,
         #responseFormat=self._responseFormat, thematicFilter=thematicFilter,
         #bbox=self._bbox,last=self._last, responseMode=self._responseMode,
         bearerToken=_bearerToken)

    res = getObs.getResponse()
    om = res.read()


    #needed to get the header
    _printNoQualityInfo=False
    _noMessageAboutNoData=True

    formatter=getFormatter(om, "csv")
    res= formatter.formatData(";",len(p),not _printNoQualityInfo)

    #transform in a dataframe
    df = pd.read_csv(StringIO(res), sep=",", na_values="noData")

    for c in df.columns:
        print(c)

    #get the parameter
    df["datetime"]=df["#Time"];
    df["stat"]=df["feature"];
    df["t"]=df["AirTemperature_2m_Avg30min in [degC]"];
    if("AirHumidity_Absolute_2m_Avg10min in [g*m-3]" in df):
        df["ah"]=df["AirHumidity_Absolute_2m_Avg10min in [g*m-3]"];  
    else:
        df["ah"]=np.nan
    if("Precipitation_Cum10min_TB in [mm]" in df):
        df["p"]=df["Precipitation_Cum10min_TB in [mm]"];
    df["w"]=df["WindSpeed_2m_Avg10min in [m*s-1]"];
    df["r"]=df["Radiation_Global_Avg10min in [W*m-2]"];

    

    df['datetime'] = pd.to_datetime(df['datetime'], utc=True)
    df['hour'] = df['datetime'].dt.ceil("H")
    df['stat'] = "de_"+df['stat']
    #print(df.head(20))
    hourly=df.groupby(["stat","hour"], as_index=False).agg({"t":['min','max','mean'],"ah":['min','max','mean'],"p":['sum'],'w':['mean'],'r':['mean']})

    #umerge the two header t+min=tmin
    hourly.columns = ["".join(x) for x in hourly.columns.ravel()]

    hourly=hourly[['stat','hour','tmin', 'tmax', 'tmean','psum','ahmin', 'ahmax', 'ahmean','wmean', 'rmean' ]]

    print(hourly.head(20))

    #Save the csv
    hourly.to_csv(path+"/working/de.csv")



import_de(config.de)
