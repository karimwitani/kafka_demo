const { Kafka } = require("kafkajs");


run();
async function run() {
    /** Creates a topic in Kafka
     * **/
    try {
        //When communicating with a broker we need to establish a tcp connection
        //This is where we create a Kafka object that will take an object as its argument
        const kafka = new Kafka({
            "clientId": "myapp",

            //You can have multiple brokers and the client will choose which one to connect to.
            "brokers": ["localhost:9092"]
        })

        //You need the admin interface to create topics.
        const admin = kafka.admin();

        //You connect to you broker, which returns a promise (so you await)
        console.log("I'm connecting ....");
        await admin.connect();
        console.log("I'm connected");

        //You create your topics.
        admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        });

        console.log("Done creating topics");
        await admin.disconnect();
    }
    catch (ex) {
        console.log(`Something bad happened ${ex}`);
    }

    finally {
        process.exit(0);
    }
}