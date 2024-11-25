import psycopg2
from psycopg2.extras import RealDictCursor
#import mysql.connector
#import MySQLdb.cursors

class DB:

    opt={};
    conn=None;
    showField=False

    def __init__(self, opt):
        if('db_type' not in opt):
            opt['db_type']='mysql';

        if(opt['db_type']=='mysql'):
            port=3306
            if('port' in opt):
                port=int(opt['port'])

            self.conn = mysql.connector.connect(host=opt['host'], port=port, user=opt['user'],passwd=opt['password'],db=opt['db']);

        else:
            port="5432";

            if 'show_field' in opt:
                if opt['show_field']:
                    self.showField = True

            if('port' in opt):
                port=str(opt['port'])
            self.conn = psycopg2.connect("dbname='"+opt['db']+"' user='"+opt['user']+"' host='"+opt['host']+"' password='"+opt['password']+"' port="+str(port)+"")

        self.opt = opt


    def query(self,q,var,showFieldLocal=None):
        """ Execute an sql command (q) getting back an array """
        try:
            if self.showField == True or showFieldLocal == True:
                cur = self.conn.cursor(cursor_factory=RealDictCursor)
            else:
                cur = self.conn.cursor()

            cur.execute(q,var);

            res = cur.fetchall()
            return {'ok':True, 'data': res};
        except MySQLdb.Error as e:
            return {'ok':False, 'message':  format(e)};
        except psycopg2.Error as e:
            return {'ok':False, 'message':  e.pgerror};


    def execute(self,q,var):
        """ Execute an sql command (q) using a connection (conn) """
        try:
            cur = self.conn.cursor()
            cur.execute(q,var);
            self.conn.commit();
            return {'ok':True};
        except MySQLdb.Error as e:
            return {'ok':False, 'message':  format(e)};
        except psycopg2.Error as e:
            self.conn.rollback();
            return {'ok':False, 'message':  e.pgerror};

    def update(self,q,var):
        """ Execute an sql command (q) using a connection (conn) """
        return self.execute(q, var)

    def delete(self, q, var):
        return self.execute(q, var)

    def select(self, q, var, showFieldLocal=None):
        return self.query(q,var, showFieldLocal)

    def insert(self,q,var):
        """ Execute an sql command (q) using a connection (conn) """
        try:
            cur = self.conn.cursor()
            cur.execute(q,var);
            self.conn.commit();

            if self.opt['db_type']=='mysql':
                inserted_id = cur.lastrowid
            else:
                inserted_id = cur.fetchone()[0]

            return {'ok':True, 'inserted_id':inserted_id};
        except MySQLdb.Error as e:
            return {'ok':False, 'message':  format(e)};
        except psycopg2.Error as e:
            self.conn.rollback();
            return {'ok':False, 'message':  e.pgerror};

    def transactions(self, aQuery):
        try:
            cur = self.conn.cursor()

            for q in aQuery:
                cur.execute(q['sql'],q['var'])

            self.conn.commit();
            return {'ok':True};
        except MySQLdb.Error as e:
            self.conn.rollback();
            return {'ok':False, 'message':  format(e)};
        except psycopg2.Error as e:
            self.conn.rollback();
            return {'ok':False, 'message':  e.pgerror};

    def get_conn_param(self):
        return self.opt
