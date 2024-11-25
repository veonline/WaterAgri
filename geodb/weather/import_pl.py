import config as config;
from ftplib import FTP
import glob, os
import pandas as pd
path=os.path.dirname(os.path.abspath(__file__))
import datetime

def should_be_download_pl(filename):
    download=False
    if(filename[-3:]=='csv'):
        if(filename[:5]=='METEO'):
            download=True;
        download=True;
    return download;

#download ftp data on the dest folder
def download_ftp(con, dest, should_be_download):
    ftp = FTP(con['server'])
    ftp.login(con['user'], con['password'])
    filenames = ftp.nlst()
    for filename in filenames:
        if filename not in ['.', '..']:
            if(should_be_download(filename)):
                print("download "+filename)
                with open(dest+filename, "wb") as f:
                    ftp.retrbinary("RETR " + filename, f.write)
            else:
                print("ND"+filename)





def get_pl(config, skip_download=False):
    if(skip_download):
        print("Skip download")
    else:
        download_ftp(config, path+"/tmp/", should_be_download_pl);
    fdest = open(path+"/working/pl.csv", 'a')

    dfall=pd.DataFrame();
    for file in glob.glob(path+"/tmp/METEO*.csv"):


        stat_name=os.path.basename(file).split("_")[0]
        
        print(stat_name)
        df = pd.read_csv(file, sep=";", na_values="NaN")
        df['datetime'] = df['Date'].astype(str)+df['Time'].apply(lambda x: str(x).zfill(6))
        df['datetime'] =pd.to_datetime(df['datetime'],format='%Y%m%d%H%M%S')
        df['t'] =df['TIW temp[C]']
        df['ps'] =df['suma[mm]']
        df['w'] =df['predkosc[m/s]']
        df['rh'] =df['TIW higro[%]']
        df['r'] =df['total[W/m2]']
        df['stat'] = "pl_"+stat_name

        #append all data frames
        if(dfall.empty):
            dfall=df
        else:
            dfall=dfall.append(df)

    #calcuate the hours
    dfall['datetime'] = pd.to_datetime(dfall['datetime'])
    dfall['hour'] = dfall['datetime'].dt.ceil("H")
    hourly=dfall.groupby(["stat","hour"], as_index=False).agg({"t":['min','max','mean'],"rh":['min','max','mean'],"ps":['min','max'],'w':['mean'],'r':['mean']})

    # #umerge the two header t+min=tmin
    hourly.columns = ["".join(x) for x in hourly.columns.ravel()]


    #calculate the pcum from the precipitation sun min and max
    hourly['psum']=hourly['psmax']-hourly['psmin'];


    # for col in hourly.columns:
    #     print("|"+col[0]+"-"+col[1]+"|")
    hourly=hourly[['stat','hour','tmin', 'tmax', 'tmean','psum','rhmin', 'rhmax', 'rhmean','wmean', 'rmean' ]]

    #Save the csv
    hourly.to_csv(path+"/working/pl.csv")



    fdest.close();


get_pl(config.pl, True)
