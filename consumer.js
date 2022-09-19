const { Kafka } = require("kafkajs");


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

        //You need the consumer interface to create broker.
        const consumer = kafka.consumer({ "groupId": "test" });

        //You connect to you broker, which returns a promise (so you await)
        console.log("I'm connecting ....");
        await consumer.connect();
        console.log("I'm connected");

        //You create your producer.
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        });

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received ${result.message.value} on partition ${result.partition}`)
            }
        })
    }
    catch (ex) {
        console.log(`Something bad happened ${ex}`);
    }

    finally {
    }
}