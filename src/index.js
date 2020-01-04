import { connect } from 'mqtt'
import BME280 from './bme280.js'

const client = connect('mqtt://mqtt');
client.on('connect', () => {})
// The BME280 constructor options are optional.
// 
const options = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : BME280.BME280_DEFAULT_I2C_ADDRESS() // defaults to 0x77
};

const bme280 = new BME280(options);

// Read BME280 sensor data, repeat
//
const readSensorData = () => {
  bme280.readSensorData()
    .then((data) => {
      console.log(JSON.stringify(data, null, 2))
      client.publish('sensor_monitor', JSON.stringify(data, null, 2));
      setTimeout(readSensorData, 300000);
    })
    .catch((err) => {
      client.publish('sensor_logs', `BME280 read error: ${err}`)
      setTimeout(readSensorData, 300000);
    });
};

// Initialize the BME280 sensor
//
bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded')
    client.publish('sensor_logs', 'BME280 initialization succeeded');
    return readSensorData();
  })
  .catch((err) => client.publish('sensor_logs', `BME280 initialization failed: ${err} `))
