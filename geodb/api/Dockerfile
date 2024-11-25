FROM ubuntu:18.04
RUN apt update
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt-get install -y  libmysqlclient-dev
COPY . /app
WORKDIR /app
RUN pip install pip --upgrade
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]
