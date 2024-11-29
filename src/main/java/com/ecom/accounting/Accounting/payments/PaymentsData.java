package com.ecom.accounting.Accounting.payments;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class PaymentsData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long sellerId;
    private String transactionId;
    private LocalDateTime paymentDate;
    private BigDecimal orderAmount;
    private BigDecimal settlementAmount;
    private String orderId;
}
