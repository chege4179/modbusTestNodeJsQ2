const express = require("express")
const app = express()
const FileUpload = require("express-fileupload")
const cors = require("cors")
const BodyParser = require("body-parser")
const mqtt = require('mqtt')

app.use(FileUpload())
app.use(cors())
app.use(BodyParser.json())

// const Broker= "broker.mqttdashboard.com"
// const TCPPort= 1883
// const WebsocketPort= 8000
// const clientId = `clientId-2sQdRMRFDy`
// const host = "broker.hivemq.com"
const options = {
	host: 'fa927ecac0404f75a7ac5837876fce5c.s1.eu.hivemq.cloud',
	port: 8883,
	protocol: 'mqtts',
	username: 'chege4179',
	password: 'Kiswahili@123',
	clean:true,

};
// const connectUrl = `mqtt://${options.host}:${options.port}`
//
// const client = mqtt.connect(connectUrl, {
//
// 	clean: true,
// 	connectTimeout: 4000,
// 	username: 'chege4179',
// 	password: 'kiswahili',
// 	reconnectPeriod: 1000,
// })


//initialize the MQTT client
const client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
	console.log('Connected');
});

client.on('error', function (error) {
	console.log("error")
	console.log(error);
});
const topic = 'testtopic/1'
client.on('message',  (topic, message) => {
	//Called each time a message is received
	console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe(topic);

// publish message 'Hello' to topic 'my/test/topic'
client.publish(topic, 'Hello');


app.post("/upload",(req,res) => {
	const file = req.body.file
	// check if a valid json string
	if (IsJsonString(file)){
		client.publish(topic,file)
		client.publish(topic,`This is a random no ${req.body.randomNumber}`)
		client.publish(topic,`This is the current timestamp ${req.body.timestamp}`)
		return res.status(201).json({
			msg:"Good Json",
			success:true,
		})
	}else {
		return res.status(400).json({
			msg:"Bad Json",
			success:true,
		})
	}

})
function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

client.on('message', function (topic, message) {
	console.log('Received message:', topic, message.toString());
});
app.listen(9000,() => console.log("Server started on Port 9000"))


