package com.ecom.accounting.Accounting.ordermanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrdersDataResponseDto {
    List<OrderCountDto> ordersData;
}
