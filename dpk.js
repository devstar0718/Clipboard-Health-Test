const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    if (!event) return TRIVIAL_PARTITION_KEY;

    if (event.partitionKey) {
        event = event.partitionKey;

        if (typeof event !== "string") event = event.toString();

        if (event.length <= MAX_PARTITION_KEY_LENGTH) return event;
    } else {
        event = JSON.stringify(event);
    }

    return crypto.createHash("sha3-512").update(event).digest("hex");
};
