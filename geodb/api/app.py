# -*- coding: utf-8 -*-
import os
import json
import logging
from flask import Flask, jsonify, render_template, request
#from flask_cors import CORS
import requests
from walib.DB import *

from flask_restful import Resource, Api
from keycloak.realm import KeycloakRealm
import time



def get_db():
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
    db = DB(DB_CONFIG);
    return db;




def get_user():


    oauth_config={
     "redirect_uri": "http://localhost:5000/",
     "realm": "wateragri",
     "auth-server-url": "http://keycloak:8080/auth",
     "ssl-required": "none",
     "resource": "php-client",
     "public-client": True,
     "use-resource-role-mappings": True,
     "secret":"cc3369b8-b5b2-4834-a6d5-e3e8531c74a5",
     "backend-usrpwd": "php-client:cc3369b8-b5b2-4834-a6d5-e3e8531c74a5"
    };

    user={}
    user['session_state'] = request.args.get('session_state');
    user['code'] = request.args.get('code');


    # realm = KeycloakRealm(server_url=oauth_config['auth-server-url'], realm_name=oauth_config['realm'])
    # oidc_client = realm.open_id_connect(client_id=oauth_config['resource'], client_secret=oauth_config['secret'])
    if(user['code']!=None):
        redirect_uri="http://localhost:5000/";

        url=oauth_config['auth-server-url']+"/realms/"+oauth_config['realm']+"/protocol/openid-connect/token";
        payload = "grant_type=authorization_code&client_secret="+oauth_config['secret']+"&client_id="+oauth_config['resource']+"&code="+user['code']+"&redirect_uri="+redirect_uri
        headers = {
           'content-type': "application/x-www-form-urlencoded",
           'cache-control': "no-cache",
           'postman-token': "2b8a03f0-1ebd-f796-469a-00cc59decde8"
        }
        r="a";
        r=requests.request("POST", url, data=payload, headers=headers)
        try:
            access=json.loads(r.text);
            access_token=access['access_token'];



        except:
            user['error']=r.text;

    return user;


db=get_db();


app = Flask(__name__)

@app.route('/')
def hello():
    user=get_user()
    return render_template('home.html', user= user)


api = Api(app)
class GetSites(Resource):
    def get(self):
        return db.select("select schema, s.name as site_name, st_x(geom) as lon, st_y(geom) as lat  from meta.site s;",[])
api.add_resource(GetSites, '/api/sites')


class GetaSite(Resource):
    def get(self, site):

        site=db.select("select schema, s.name as site_name, st_x(geom) as lon, st_y(geom) as lat  from meta.site s WHERE schema=%s;",[site])
        topic=db.select("select *  from meta.topic;",[])
        ret={"site": site, "topic": topic}
        return ret;
api.add_resource(GetaSite, '/api/site/<string:site>')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)



#https://medium.com/@agusnavce/authentication-is-hard-keycloak-to-the-rescue-32ca4b442a13
# app = Flask(__name__)
#
#
# @app.route('/', methods=['POST'])
# def home():
#     ret={};
#     return jsonify(ret), 200
#
# @app.route('/token_login/', methods=['POST'])
# def get_token():
#     body = request.get_json()
#     for field in ['username', 'password']:
#         if field not in body:
#             return error("Field {field} is missing!"), 400
#     data = {
#         'grant_type': 'password',
#         'client_id': os.getenv('CLIENT_ID'),
#         'client_secret': os.getenv('CLIENT_SECRET'),
#         'username': body['username'],
#         'password': body['password']
#     }
#     url = ''.join([
#         os.getenv('KEYCLOAK_URI'),
#         'realms/',
#         os.getenv('REALM'),
#         '/protocol/openid-connect/token'
#     ])
#     response = requests.post(url, data=data)
#     if response.status_code > 200:
#         message = "Error en username/password"
#         return error(message), 400
#     tokens_data = response.json()
#     ret = {
#         'tokens': {"access_token": tokens_data['access_token'],
#                    "refresh_token": tokens_data['refresh_token'], }
#     }
#     return jsonify(ret), 200
#
#
# @app.route('/token_refresh/', methods=['POST'])
# def refresh_token():
#     body = request.get_json()
#     for field in ['refresh_token']:
#         if field not in body:
#             return error("Field {field} is missing!"), 400
#     data = {
#         'grant_type': 'refresh_token',
#         'client_id': os.getenv('CLIENT_ID'),
#         'client_secret': os.getenv('CLIENT_SECRET'),
#         'refresh_token': body['refresh_token'],
#     }
#     url = os.getenv('KEYCLOAK_URI') + 'realms/' + \
#         os.getenv('REALM') + '/protocol/openid-connect/token'
#     response = requests.post(url, data=data)
#     if response.status_code != requests.codes.ok:
#         return error("Error en refresh token"), 400
#     data = response.json()
#     ret = {
#         "access_token": data['access_token'],
#         "refresh_token": data['refresh_token']
#     }
#     return jsonify(ret), 200
#
#
# # @auth.route('/users/', methods=['POST'])
# # def create_user():
# #     try:
# #         body = request.get_json()
# #         endpoint = '/users'
# #         data = {
# #             "email": body.get('email'),
# #             "username": body.get('email'),
# #             "firstName": body.get('name'),
# #             "lastName": body.get('sirname'),
# #             "credentials": [{"value": body.get('password'), "type": 'password', 'temporary': False}],
# #             "enabled": True,
# #             "emailVerified": False
# #         }
# #         response = keycloak_post(endpoint, data)
# #     except KeycloakAdminError as e:
# #         try:
# #             message = e.response.json().get('errorMessage')
# #         except Exception as err:
# #             message = e.message
# #         app.logger.error(e.traceback())
# #         return error(message), 400
# #     except Exception as e:
# #         print(e)
# #         return error('Error with keycloak'), 400
# #     return "", 204
#
#
# @app.errorhandler(404)
# def not_found(e):
#     return error("No exite la ruta para la url deseada en esta api"), 404
#
#
# @app.errorhandler(405)
# def doesnt_exist(e):
#     return error("No exite la ruta para la url deseada en esta api"), 405
#
#
# def error(message):
#     return jsonify({
#         'success': False,
#         'message': message
#     })
#
#
# def keycloak_post(endpoint, data):
#     """
#     Realiza un POST request a Keycloak
#     :param {string} endpoint Keycloak endpoint
#     :data {object} data Keycloak data object
#     :return {Response} request response object
#     """
#     url = os.getenv('KEYCLOAK_URI') + 'admin/realms/' + \
#         os.getenv('REALM') + endpoint
#     headers = get_keycloak_headers()
#     response = requests.post(url, headers=headers, json=data)
#     if response.status_code >= 300:
#         app.logger.error(response.text)
#         raise KeycloakAdminError(response)
#     return response
#
#
# def get_keycloak_headers():
#     """
#     Devuelve los headers necesarios para comunicarlos con la API de Keycloak
#     utilizando el usuario de administracion del Realm.
#     :return {object} Objeto con headers para API de Keycloak
#     """
#     return {
#         'Authorization': 'Bearer ' + get_keycloak_access_token(),
#         'Content-Type': 'application/json'
#     }
#
#
# def get_keycloak_access_token():
#     """
#     Devuelve los tokens del usuario `admin` de Keycloak
#     :returns {string} Keycloak admin user access_token
#     """
#     data = {
#         'grant_type': 'password',
#         'client_id': 'admin-cli',
#         'username': os.getenv('ADMIN_USER'),
#         'password': os.getenv('ADMIN_PASS')
#     }
#     response = requests.post(os.getenv('KEYCLOAK_URI') + 'realms/' +
#                              os.getenv('REALM') + '/protocol/openid-connect/token', data=data)
#     if response.status_code != requests.codes.ok:
#         raise KeycloakAdminTokenError(response)
#     data = response.json()
#     return data.get('access_token')
#
#
# class KeycloakAdminError(Exception):
#     message = 'Keycloak error'
#
#     def __init__(self, response, message=None):
#         if message is not None:
#             self.message = message
#         # Call the base class constructor with the parameters it needs
#         super().__init__(self.message)
#         # Now for your custom code...
#         self.response = response
#
#     def traceback(self):
#         return traceback.format_exc()
#
#     def __str__(self):
#         return json.dumps({
#             'message': self.message,
#             'status_code': self.response.status_code,
#             'text': self.response.text
#         })
