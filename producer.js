const { Kafka } = require("kafkajs");
const { Partitioners } = require('kafkajs')

const msg = process.argv[2];

run();
async function run() {
    /** Creates a producer in Kafka
     * **/
    try {
        //When communicating with a broker we need to establish a tcp connection
        //This is where we create a Kafka object that will take an object as its argument
        const kafka = new Kafka({
            "clientId": "myapp",

            //You can have multiple brokers and the client will choose which one to connect to.
            "brokers": ["localhost:9092"]
        })

        //You need the producer interface to create broker.
        const producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        });

        //You connect to you broker, which returns a promise (so you await)
        console.log("I'm connecting ....");
        await producer.connect();
        console.log("I'm connected");

        //You create your producer.
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "uSr",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        });

        console.log(`Sent message ${msg} succesfully ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch (ex) {
        console.log(`Something bad happened ${ex}`);
    }

    finally {
        process.exit(0);
    }
}