const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

describe("deterministicPartitionKey", () => {
    it("Returns the TRIVIAL_PARTITION_KEY(literal '0') when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
    });
    it("Returns Hash of json-formatted input when given input has no partitionKey", () => {
        let event = "Test";
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(
            crypto
                .createHash("sha3-512")
                .update(JSON.stringify(event))
                .digest("hex")
        );
    });
    it("Returns partitionKey as string when given input has a partitionKey which is not string", () => {
        let key = 123;
        let event = { partitionKey: key };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(key.toString());
    });
    it("Returns Hash of partitionKey when given input has a partitionKey which has greater size than MAX_PARTITION_KEY_LENGTH(256)", () => {
        let key = new Array(MAX_PARTITION_KEY_LENGTH + 2).join("a");
        let event = { partitionKey: key };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(
            crypto.createHash("sha3-512").update(key).digest("hex")
        );
    });
    it("Returns partitionKey when given event has a partitionKey as string and the size is not greater than MAX_PARTITION_KEY_LENGTH(256)", () => {
        let key = "Test";
        let event = { partitionKey: key };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(key);
    });
});
