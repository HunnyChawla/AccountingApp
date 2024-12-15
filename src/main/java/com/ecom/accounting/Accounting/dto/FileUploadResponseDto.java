package com.ecom.accounting.Accounting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileUploadResponseDto {
    private String message;
    private boolean isError;
    private String serverFilePath;
}
