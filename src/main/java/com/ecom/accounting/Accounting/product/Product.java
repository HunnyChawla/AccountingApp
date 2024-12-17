package com.ecom.accounting.Accounting.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Product {
    @Id
    private String skuId;
    private String productName;
    private BigDecimal cost;
    private String sellerId;
}
