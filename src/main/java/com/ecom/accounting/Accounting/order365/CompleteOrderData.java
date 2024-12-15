package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class CompleteOrderData {
    @Id
    private String orderId;
    private String sellerId;
    private String skuId;
    private BigDecimal orderAmount;
    private BigDecimal bankSettlement;
    private BigDecimal profit;
    private LocalDate orderDate;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
}
