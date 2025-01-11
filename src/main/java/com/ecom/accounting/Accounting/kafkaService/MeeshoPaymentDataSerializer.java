package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.entities.MeeshoPaymentData;
import org.apache.kafka.common.serialization.Serializer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;

public class MeeshoPaymentDataSerializer implements Serializer<List<MeeshoPaymentData>> {
    @Override
    public byte[] serialize(String topic, List<MeeshoPaymentData> data) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = null;

        try {
            objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
            objectOutputStream.writeObject(data);
            objectOutputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return byteArrayOutputStream.toByteArray();
    }
}
