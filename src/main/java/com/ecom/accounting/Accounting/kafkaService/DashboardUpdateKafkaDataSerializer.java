package com.ecom.accounting.Accounting.kafkaService;


import com.ecom.accounting.dtos.DashboardUpdateKafkaDto;
import org.apache.kafka.common.serialization.Serializer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class DashboardUpdateKafkaDataSerializer implements Serializer<DashboardUpdateKafkaDto> {
    @Override
    public byte[] serialize(String topic, DashboardUpdateKafkaDto data) {
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
