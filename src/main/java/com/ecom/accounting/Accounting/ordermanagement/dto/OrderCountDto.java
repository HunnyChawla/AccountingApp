package com.ecom.accounting.Accounting.ordermanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderCountDto {
    private String date;
    private Long orders;
}
