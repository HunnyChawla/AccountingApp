package com.ecom.accounting.Accounting.kafkaService;


import com.ecom.accounting.dtos.FileUploadDataKafkaDto;
import org.apache.kafka.common.serialization.Serializer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;

public class FileUploadDataSerializer implements Serializer<FileUploadDataKafkaDto> {
    @Override
    public byte[] serialize(String topic, FileUploadDataKafkaDto data) {
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
