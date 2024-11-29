package com.ecom.accounting.Accounting.meeshoFileupload;

import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@RestController
@RequestMapping("/api/excel")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a valid Excel file.");
//        }
//
//        fileUploadService.saveDataFromExcel(file);
//        return ResponseEntity.ok("File uploaded and data saved successfully.");
//    }

    @PostMapping("/upload-orders")
    public ResponseEntity<String> uploadOrders(@RequestParam("file") MultipartFile file) throws CsvValidationException, IOException {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a valid CSV file.");
        }

        fileUploadService.saveCSVData(file);
        return ResponseEntity.ok("File uploaded and data saved successfully.");
    }

    @PostMapping("/uploadPaymentData")
    public ResponseEntity<String> uploadPaymentData(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a valid Excel file.");
        }

        fileUploadService.savePaymentDataFromExcel(file);
        return ResponseEntity.ok("File uploaded and data saved successfully.");
    }



    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("fileType") String fileType) {
        try {
            String filePath = fileUploadService.uploadFile(file,fileType);
            return ResponseEntity.ok("File uploaded successfully: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file: " + e.getMessage());
        }
    }
}
