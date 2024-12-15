package com.ecom.accounting.Accounting.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic dataProcessingTopic() {
        return new NewTopic("data-processing-topic", 1, (short) 1);
    }
    @Bean
    public NewTopic messhoOrderDataFileUpload() {
        return new NewTopic("meesho.order.data.file.upload", 1, (short) 1);
    }
    @Bean
    public NewTopic messhoPaymentDataFileUpload() {
        return new NewTopic("meesho.payments.data.file.upload", 1, (short) 1);
    }

    @Bean
    public NewTopic messhoProcessOrderData() {
        return new NewTopic("meesho.order.data.process", 1, (short) 1);
    }
    @Bean
    public NewTopic messhoProcessPaymentsData() {
        return new NewTopic("meesho.payment.data.process", 1, (short) 1);
    }
}
