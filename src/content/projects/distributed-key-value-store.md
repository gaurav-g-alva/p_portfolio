---
title: "aether distributed database"
description: "a high-performance distributed key-value store using the raft consensus protocol in go, featuring partition tolerance and dynamic cluster resizing."
link: "https://github.com/alexcarter/aether"
skills: ["Go", "Raft", "Distributed Systems", "Docker"]
thumbnail: ""
---

### Architecture overview

aether is a distributed key-value store designed for high availability and consistency across networking splits. 

### Core Features

- **Raft Implementation**: Built a custom Raft state machine from scratch for leader election, log replication, and safety.
- **Log Compaction**: Dynamic log compaction (snapshotting) to prevent infinite log growth.
- **HTTP / gRPC APIs**: Simple client APIs for reading and writing data, and gRPC for internal cluster communications.
- **Verification**: Validated with Jepsen tests to ensure consistency under network partitions and latency spikes.
