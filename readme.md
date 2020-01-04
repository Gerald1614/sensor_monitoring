
# Project Title

Monitoring sensor data with grafana 

## Getting Started

Thei sporjetc is a small project to implement on a single Raspberry pi a solution to collect data from a BME280 sensor (temperature, Hunidity and pressure) and send them through MQTT and telegraf to a timeserie DB (Influxdb) on which we connect Grafana

### Prerequisites

a raspberry pi with BME280 sensor (no need o shwo the diagram as many tutorials already cover that)

### Installing

Clone this repository

deploy to the raspberry Pi (use nay FTP tool)
then move to the directory /sensor_monit

create network and volumes:
```
server1$ docker network create monitoring
server1$ docker volume create grafana-volume
server1$ docker volume create influxdb-volume

```
to build and run the containers :
 ```
 sudo docker-compose -f docker-compose.yml up --build -d
 ```

build the database and users:

 ```
docker exec -it influxdb bash
influx
CREATE DATABASE telegraf
CREATE USER telegraf WITH PASSWORD 'telegraph'
GRANT ALL ON telegraf TO telegraf
```
view logs :

```
  docker logs telegraf
  docker logs influxdb
  docker logs sensor_monitor
```


to stop all containers:
```
sudo docker-compose -f docker-compose.yml down
```



## Built With

* [Docker](https://docs.docker.com/) - to deploy the 4 components into containers
* [influxdb](https://docs.influxdata.com/influxdb/v1.7/introduction/getting-started/) - a timeserie Database
* [telegraf](https://github.com/influxdata/telegraf) - tofeed influxdb from MQTT
* [MQTT Mosquito](https://mosquitto.org/) - a lightweight message broker 
* [grafana](https://grafana.com/docs/grafana/latest/) - Monitoring tool


## Authors

* **Gerald Michelant** - *Initial work* - [Gerald1614](https://github.com/Gerald1614)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

