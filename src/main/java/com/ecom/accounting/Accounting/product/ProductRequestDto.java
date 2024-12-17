package com.ecom.accounting.Accounting.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDto {
    private String sku;
    private String name;
    private BigDecimal cost;
}
