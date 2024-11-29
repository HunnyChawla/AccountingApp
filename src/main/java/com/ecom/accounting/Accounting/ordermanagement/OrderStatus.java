package com.ecom.accounting.Accounting.ordermanagement;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;


public enum OrderStatus {
    RTO,
    DELIVERED,
    RETURN,
    CANCELLED,
    RTO_COMPLETE
}
