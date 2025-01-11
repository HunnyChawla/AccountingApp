package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.dtos.FileUploadDataKafkaDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;

@Configuration
public class KafkaListenerContainerFactoryConfig {
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, FileUploadDataKafkaDto> fileUploadDataKafkaDtoConcurrentKafkaListenerContainerFactory(
            ConsumerFactory<String, FileUploadDataKafkaDto> fileUploadConsumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, FileUploadDataKafkaDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(fileUploadConsumerFactory);
        return factory;
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> processDataKafkaListenerContainerFactory(
            ConsumerFactory<String, String> processDataConsumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(processDataConsumerFactory);
        return factory;
    }
}
