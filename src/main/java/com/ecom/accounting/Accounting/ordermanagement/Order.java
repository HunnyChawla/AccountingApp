package com.ecom.accounting.Accounting.ordermanagement;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "\"order\"") // Escapes the table name
public class Order {
    @Id
    private Long orderId;
    private Long sellerId;
    private LocalDateTime orderDate;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private String sku;
    private LocalDateTime dispatchDate;
    private Integer quantity;
}
