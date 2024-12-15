package com.ecom.accounting.Accounting.order365.dto;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CompleteOrderDto {
    private String orderId;
    private String skuId;
    private BigDecimal orderAmount;
    private BigDecimal bankSettlement;
    private BigDecimal profit;
    private LocalDate orderDate;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
}
