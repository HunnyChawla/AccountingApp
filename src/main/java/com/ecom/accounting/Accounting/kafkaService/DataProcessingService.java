package com.ecom.accounting.Accounting.kafkaService;

import com.ecom.accounting.Accounting.meeshoFileupload.FileUploadService;
import com.ecom.accounting.dtos.FileUploadDataKafkaDto;
import com.ecom.accounting.entities.MeeshoPaymentData;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DataProcessingService {

    @Autowired
    private FileUploadService fileUploadService;

    @KafkaListener(topics = "process-meesho-payment-data", groupId = "data-processing-group")
    public void processFile(List<MeeshoPaymentData> meeshoPaymentDataList) {
        System.out.println("Received message to process file: " + meeshoPaymentDataList.size());

        // Load data from the file
        // Process data (e.g., read from multiple tables)
        // Save processed data to the target table
        // This is your business logic
    }

    @KafkaListener(topics = "meesho.order.data.file.upload", groupId = "process-meesho-order-data-group-1", containerFactory = "fileUploadDataKafkaDtoConcurrentKafkaListenerContainerFactory")
    public void processMeeshoOrderData(FileUploadDataKafkaDto fileUploadDataKafkaDto) throws CsvValidationException, IOException {
        System.out.println("Received message to process order data file: " + fileUploadDataKafkaDto.getFilePath());
        System.out.println("Received message for seller: " + fileUploadDataKafkaDto.getSellerId());
        fileUploadService.saveMeeshoOrderData(fileUploadDataKafkaDto.getFilePath(),fileUploadDataKafkaDto.getSellerId());
    }

    @KafkaListener(topics = "meesho.payments.data.file.upload", groupId = "process-meesho-payment-data-group-1", containerFactory = "fileUploadDataKafkaDtoConcurrentKafkaListenerContainerFactory")
    public void processMeeshoPaymentData(FileUploadDataKafkaDto fileUploadDataKafkaDto) throws CsvValidationException, IOException {
        System.out.println("Received message to process payment data file: " + fileUploadDataKafkaDto.getFilePath());
        System.out.println("Received message for seller: " + fileUploadDataKafkaDto.getSellerId());
        fileUploadService.savePaymentDataFromExcel(fileUploadDataKafkaDto.getFilePath(),fileUploadDataKafkaDto.getSellerId());
    }
}
