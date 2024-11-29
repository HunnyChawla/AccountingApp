package com.ecom.accounting.Accounting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class FileUploadDataKafkaDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private String sellerId;
    private String filePath;
}
