package com.ecom.accounting.Accounting.ordermanagement.dto;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class OrderCountByStatusResponseDto {
    private OrderStatus orderStatus;
    private Long count;
}
