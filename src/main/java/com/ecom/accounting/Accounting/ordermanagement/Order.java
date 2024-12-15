package com.ecom.accounting.Accounting.ordermanagement;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@Table(name = "\"order\"") // Escapes the table name
public class Order {
    @Id
    private String orderId;
    private String sellerId;
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
