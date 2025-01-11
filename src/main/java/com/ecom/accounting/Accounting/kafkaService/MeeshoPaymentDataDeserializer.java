package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.entities.MeeshoPaymentData;
import org.apache.kafka.common.serialization.Deserializer;

import java.io.*;
import java.util.List;

public class MeeshoPaymentDataDeserializer implements Deserializer<List<MeeshoPaymentData>> {
    @Override
    public List<MeeshoPaymentData> deserialize(String topic, byte[] data) {
        // Deserialize back to object
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(data);
        ObjectInputStream objectInputStream = null;
        List<MeeshoPaymentData> deserializedObjects;
        try {
            objectInputStream = new ObjectInputStream(byteArrayInputStream);
            deserializedObjects = (List<MeeshoPaymentData>) objectInputStream.readObject();
            objectInputStream.close();
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return deserializedObjects;
    }
}
