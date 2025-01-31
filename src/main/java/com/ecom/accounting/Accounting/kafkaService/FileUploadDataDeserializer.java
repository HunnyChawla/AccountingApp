package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.Accounting.dto.FileUploadDataKafkaDto;
import com.ecom.accounting.Accounting.meeshoFileupload.MeeshoPaymentData;
import org.apache.kafka.common.serialization.Deserializer;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.List;

public class FileUploadDataDeserializer implements Deserializer<FileUploadDataKafkaDto> {
    @Override
    public FileUploadDataKafkaDto deserialize(String topic, byte[] data) {
        // Deserialize back to object
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(data);
        ObjectInputStream objectInputStream = null;
        FileUploadDataKafkaDto deserializedObjects;
        try {
            objectInputStream = new ObjectInputStream(byteArrayInputStream);
            deserializedObjects = (FileUploadDataKafkaDto)objectInputStream.readObject();
            objectInputStream.close();
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return deserializedObjects;
    }
}
