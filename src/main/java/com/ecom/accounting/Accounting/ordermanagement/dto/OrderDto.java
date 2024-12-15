package com.ecom.accounting.Accounting.ordermanagement.dto;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import com.ecom.accounting.Accounting.ordermanagement.Platform;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class OrderDto {
    private String orderId;
    private LocalDate orderDate;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private String sku;
    private LocalDate dispatchDate;
    private Integer quantity;
    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private Platform platform;
}
