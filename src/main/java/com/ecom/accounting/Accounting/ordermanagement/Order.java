package com.ecom.accounting.Accounting.ordermanagement;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class Order {
    @Id
    private Long orderId;
    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private String sku;
    private LocalDateTime dispatchDate;
    private Integer quantity;
}
