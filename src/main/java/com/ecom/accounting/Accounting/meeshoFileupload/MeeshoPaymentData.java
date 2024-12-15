package com.ecom.accounting.Accounting.meeshoFileupload;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class MeeshoPaymentData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sellerId;
    private String subOrderNo;
    private LocalDateTime orderDate;
    private LocalDateTime dispatchDate;
    private String productName;
    private String sku;
    private String orderStatus;
    private Double gst_percentage;
    private BigDecimal listingPrice;
    private Integer quantity;
    private String transactionId;
    private LocalDateTime paymentDate;
    private BigDecimal final_settlementAmount;
    private String priceType;
    private BigDecimal totalSaleAmount;
    private BigDecimal saleReturnAmount;
    private BigDecimal fixedFeeInclGst;
    private BigDecimal wareHousingFee;
    private BigDecimal shippingRevenue;
    private BigDecimal shippingReturnAmount;
    private BigDecimal returnPremium;
    private BigDecimal returnPremiumOfReturn;
    private BigDecimal meeshoCommission;
    private BigDecimal meeshoCommissionPercentage;
    private BigDecimal meeshoCommissionExclGst;
    private BigDecimal meeshoGoldPlatformFee;
    private BigDecimal meeshoMallPlatformFee;
    private BigDecimal fixedFeeExclGst;
    private BigDecimal warehousingFeeExclGst;
    private BigDecimal returnShippingChargeExclGst;
    private BigDecimal gstCompensation;
    private BigDecimal shippingChargeExclGst;
    private BigDecimal otherSupportServiceChargesExclGst;
    private BigDecimal waiversExclGst;
    private BigDecimal netOtherSupportServiceChargesExclGst;
    private BigDecimal gstOnMeeshoCommission;
    private BigDecimal gstOnWareHousingFee;
    private BigDecimal gstOnMeeshoGold;
    private BigDecimal gstOnMeeshoMallPlatformFee;
    private BigDecimal gstOnMeeshoShippingCharges;
    private BigDecimal gstOnReturnShippingCharges;
    private BigDecimal gstOnNetOtherSupportServiceCharges;
    private BigDecimal gstOnFixedFee;
    private BigDecimal tcs;
    private BigDecimal tdsRate;
    private BigDecimal tds;
    private BigDecimal compensation;
    private BigDecimal claims;
    private BigDecimal recovery;
    private String compensationReason;
    private String claimsReason;
    private String recoveryReason;
    private int processingStatus = 0;
}
