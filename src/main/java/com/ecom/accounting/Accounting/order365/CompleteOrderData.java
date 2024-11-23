package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CompleteOrderData {
    @Id
    private String orderId;
    private String skuId;
    private BigDecimal orderAmount;
    private BigDecimal bankSettlement;
    private BigDecimal profit;
    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
}
