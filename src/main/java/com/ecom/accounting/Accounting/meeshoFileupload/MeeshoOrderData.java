package com.ecom.accounting.Accounting.meeshoFileupload;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Setter
@Getter
public class MeeshoOrderData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sellerId;
    private String reasonForCreditEntry;
    private String subOrderNo;
    private LocalDate orderDate;
    private String customerState;
    private String productName;
    private String sku;
    private String size;
    private Integer quantity;
    private BigDecimal supplier_listed_price;
    private BigDecimal supplier_discounted_price;
    private String packetId;

}
