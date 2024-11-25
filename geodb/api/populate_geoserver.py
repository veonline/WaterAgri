import os
import requests
from walib.DB import *


print("Start");

#load variable
geoserver_user="admin";
geoserver_password=os.getenv('GEOSERVER_ADMIN_PASSWORD');
geoserver_path=os.getenv('GEOSERVER_PATH');

#the connection from geoserver to db is within the container using the host and the internal port
pg_host="db";
pg_port="5432";
pg_db=os.getenv('POSTGRES_DB');
pg_user=os.getenv('POSTGRES_USER');
pg_pass=os.getenv('POSTGRES_PASSWORD');

#overwrite the host and port (to works out of the container, set the end variables)
pg_host_db=pg_host
pg_port_db=pg_port
if(os.getenv('POSTGRES_OVERWRITE_HOST')!=None):
    pg_host_db=os.getenv('POSTGRES_OVERWRITE_HOST');
if(os.getenv('POSTGRES_OVERWRITE_PORT')!=None):
    pg_port_db=os.getenv('POSTGRES_OVERWRITE_PORT');

#get the db connection
DB_CONFIG = {"db_type":"postgres","host":pg_host_db,"port": pg_port_db, "user":pg_user, "password":pg_pass,"db":pg_db, "show_field": True}
print(DB_CONFIG);
db = DB(DB_CONFIG);

#generic post request to geoserver
def post_geo(method, payload):
    url=geoserver_path+"rest/"+method
    headers = {'Content-type': 'text/xml'}
    r =requests.post(url, auth=(geoserver_user, geoserver_password), data=payload, headers=headers)
    print(r)
    return r;

#add a workspace in geoserver
def add_workspace(ws):
    payload="<workspace><name>"+ws+"</name></workspace>"
    return post_geo("workspaces", payload);

#add a workspace in geoserver
def add_datastore(ws):
    payload="<dataStore><name>"+ws+"</name><connectionParameters><host>"+pg_host+"</host><port>"+pg_port+"</port><database>"+pg_db+"</database><schema>"+ws+"</schema><user>"+pg_user+"</user><passwd>"+pg_pass+"</passwd><dbtype>postgis</dbtype></connectionParameters></dataStore>";
    post_geo("workspaces/"+ws+"/datastores", payload);

#add a postgis layer in geoserver (srid=4326, boundbox=~europe)
def add_layer(ws, layer_name):
    srid=4326;
    minx=str(-10); maxx=str(80); miny=str(20); maxy=str(70);
    payload="<featureType><name>"+layer_name+"</name><nativeName>"+layer_name+"</nativeName><title>"+layer_name+"</title>";
    payload+="<keywords><string>"+layer_name+"</string><string>features</string></keywords>";
    payload+="<srs>EPSG:"+str(srid)+"</srs>";
    payload+="<nativeBoundingBox><minx>"+minx+"</minx><maxx>"+maxx+"</maxx><miny>"+miny+"</miny><maxy>"+maxy+"</maxy></nativeBoundingBox>";
    payload+="<latLonBoundingBox><minx>"+minx+"</minx><maxx>"+maxx+"</maxx><miny>"+miny+"</miny><maxy>"+maxy+"</maxy></latLonBoundingBox>";
    payload+="<projectionPolicy>FORCE_DECLARED</projectionPolicy><enabled>true</enabled><metadata><entry key=\"cachingEnabled\">false</entry></metadata><maxFeatures>0</maxFeatures><numDecimals>0</numDecimals>";
    payload+="</featureType>";

    post_geo("workspaces/"+ws+"/datastores/"+ws+"/featuretypes", payload);


#add the meta datastore
ws="meta";
add_workspace(ws);
add_datastore(ws);
add_layer(ws, "site");


#query the topic
topics=db.select("select * from meta.topic;",[]);
fields=db.select("select * from meta.field;",[]);

#iterate over the sites
sites=db.select("select * from meta.site;",[]);
for s in sites['data']:
    schema=s['schema']
    #add workspace and datastore for each site
    add_workspace(schema);
    add_datastore(schema);

    #create the schema
    db.update("CREATE SCHEMA IF NOT EXISTS "+schema,[]);

    for t in topics['data']:
        table_name=t['topic'];
        geom_type=t['format'];

        #create the table in the schema abou the topic
        q="CREATE TABLE IF NOT EXISTS "+schema+"."+table_name+"(";
        q+=" id_"+table_name+" serial, geom geometry("+geom_type+",4326), ";
        q+=" CONSTRAINT "+table_name+"_pkey PRIMARY KEY (id_"+table_name+")";
        q+=")"
        res=db.update(q,[]);

        if(res['ok']):
            add_layer(schema, table_name);
