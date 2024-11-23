package com.ecom.accounting.Accounting.ordermanagement;

import com.ecom.accounting.Accounting.meeshoFileupload.FileUploadService;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload-excel")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a valid Excel file.");
        }

        fileUploadService.saveDataFromExcel(file);
        return ResponseEntity.ok("File uploaded and data saved successfully.");
    }

    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadOrders(@RequestParam("file") MultipartFile file) throws CsvValidationException, IOException {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a valid CSV file.");
        }

        fileUploadService.saveCSVData(file);
        return ResponseEntity.ok("File uploaded and data saved successfully.");
    }
}
