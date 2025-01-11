package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.dtos.FileUploadDataKafkaDto;
import com.ecom.accounting.entities.MeeshoPaymentData;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public KafkaTemplate<String, MeeshoPaymentData> meeshoPaymentDataKafkaTemplate() {
        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(producerProps(MeeshoPaymentDataSerializer.class)));
    }

    @Bean
    public KafkaTemplate<String, FileUploadDataKafkaDto> fileUploadDataKafkaDtoKafkaTemplate() {
        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(producerProps(FileUploadDataSerializer.class)));
    }

    @Bean
    public KafkaTemplate<String, String> processDataKafkaTemplate() {
        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(producerProps(StringSerializer.class)));
    }

    private Map<String, Object> producerProps(Class<? extends Serializer> serializerClass) {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, serializerClass);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return props;
    }
}
