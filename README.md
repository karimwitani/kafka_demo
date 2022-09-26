# Kafka Knowledge Base
This KB is intended to introduce the reader to the fundamental concepts of Kafka. Included in the Repo are a few demos on running kafka clusters as well as references pulled from various usefull articles found on the web.

# Table of contents
- [Demos](#demos)
- [References](#references)
  - [Articles](#articles)
  - [Books](#books)
  - [Official Documentation](#official-documentation)
- [Key Concepts / Glossary](#key-concepts--glossary)


# Demos
[Linux local server demo](kafka_linux_demo_/kafka_linux_demo.ipynb)  

[Docker + Kafkajs (Node) demo](kafkjs_docker_demo)

[Docker multi network demo (Comming Soon)](./)

# References
## Articles
[Confluent: How to choose the number of partitions in a kafka cluster](https://www.confluent.io/blog/how-choose-number-topics-partitions-kafka-cluster/)

[StackOverflow : How to create a new consumer group in kafka](https://stackoverflow.com/questions/61770993/how-to-create-a-new-consumer-group-in-kafka)  

[StackOverflow : Kafka server configuration - listeners vs. advertised.listeners](https://stackoverflow.com/questions/42998859/kafka-server-configuration-listeners-vs-advertised-listeners#:~:text=Listeners%20are%20all%20the%20addresses,talk%20to%20the%20current%20broker.)

[Confuent : Kafka Listeners – Explained](https://www.confluent.io/blog/kafka-listeners-explained/)

[Conduktor: Producer Default Partitioner & Sticky Partitioner](https://www.conduktor.io/kafka/producer-default-partitioner-and-sticky-partitioner)

[Confluent: Top 5 Things Every Apache Kafka Developer Should Know](https://www.confluent.io/blog/5-things-every-kafka-developer-should-know/)


## Books 
[O'Reilly: Kafka, The Definitive Guide - Neha Narkhede, Gwen Shapira & Todd Palino](https://www.confluent.io/wp-content/uploads/confluent-kafka-definitive-guide-complete.pdf)


## Official Documentation 
[Apache Foundation: Kafka Documentation](https://kafka.apache.org/documentation/)  

[Apache Foundation: Kafka Protocole Guide](https://kafka.apache.org/protocol.html)

[Docker : Networking overview](https://docs.docker.com/network/)



# Key Concepts / Glossary


* BackPressure :
* Big Data Ingestion :
* Brokers : Brokers are kafka’s servers. They receive from producers and hand out data to consumers. 
* Cluster Controllers :  A designated broker in a kafka cluster that reads/writes metadata to/from Zookeper and is responsible for assigning leadership across the brokers for each partition.
* Clusters : A collection of kafka brokers.
* Consumer Groups : A collection of consumers that are assigned to reading the same topic, they are assigned the same group-id. Kafka ensures that each partition of a topic is consumed by only one member of the group, a message is only read once by a single member of a consumer group.   
![](https://miro.medium.com/max/640/1*J-0xbraSo0fbyrrPCXedlg.png)  ![](https://miro.medium.com/max/640/1*J-0xbraSo0fbyrrPCXedlg.png)  
This process allows parallel consumption of a topic, enabling higher throughput, however the maximum benefit is limited to the number of partitions on a topic. You can have more consumers than partitions on a topics (N+1) where a consumer is idle to implement a hot failover (in case a consumer fails another is ready to take its place)  
![](https://miro.medium.com/max/640/1*u9fycPZCrnr80fS-mhTX4w.png)
* Disk Based Retention :
* ETL / CDC :
* Events : An event is a fact that happened in the past, they are representation of something that 
* Fault Tolerance :
happened in a system as an array of bytes.
* Java Message System :
* Leaders :
* Offsets: sequential identifiers that are unique to each record in the partition. When a new record is written to the end of the log file (partition )it is assigned a new offset that is incremented. They are useful for consumers who need to know where to pick up from the last time they read from the partition. Messages within the partition are always ordered but there is no guarantee of ordering ACROSS partitions
![](https://miro.medium.com/max/720/1*UEjzjKWxqduWnOpIzC34Ow.png)  
![](https://miro.medium.com/max/640/1*qlXZaR453wKWBqSl-JQFvQ.png)  
* Partition : Partitions of topics hold a subset of records owned by a topic. Each partition is single log file that holds records in an append only fashion  
![](https://miro.medium.com/max/640/1*JFfNA2FUsF3iek2lHAZlEA.png).   
A rough formula for determining the number of partitions needed is max(t/p ,t/c) where t is target throughput, p is producer throughput (on a single partition) and c is consumer throughput (on a single partition). One has to decide on a trade off between speed and reliability when it come to the number of partitions on a broker as in the case of failure, having too many partitions on a broker will slow down the process of electing a new partition leader (which are the only ones that can be written to from the producers)
Partition keys: The key that indicates which partition a message will be written to. When producers send a message to a topic they use information from the application context to derive a key, using a hash function, this could be a userID or a deviceID. If the input that decides the partition key is not well distributed (1 clientID generating a disproportionate amount of records), a solution would be to let kafka decide the partition assignment using round robin.  
![](https://miro.medium.com/max/720/1*UVEPQaFJhu9yu1mJW8r60w.png)   
Using hashed keys may be necessary if you need messages coming from the same user/device to be consumer in the order that they were produced. 
* Redundancy : Each partition has replicas across a cluster’s broker which are continuously updating and “catching” to the partition leader. This allows for failover to the follower partitions in case the leader suffers a crash.
* Replication :
* Retention Policy :
* Scalability : Kafka distributes partitions across its cluster’s brokers which leads to higher throughput, a topic can be read by multiple consumers concurrently because they don’t all have to read from the same partition. 
* Streams : Streams are related events that flow in sequence.
* Topics : Topics group related events and store them. They are similar to tables in databases and folders in file systems. In * Kafka they are used to decouple the producers and consumers of data. Producers will "POST" while consumers will "GET" from a topic without having to be directly connected between themselves, they reach out to the kafka brokers (specifically the leaders of a topic) for such ends   
![](https://miro.medium.com/max/1400/1*APGq98CaniHGoDvfjgbVaA.png)
