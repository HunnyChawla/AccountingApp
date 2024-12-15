package com.ecom.accounting.Accounting.ordermanagement;


public enum OrderStatus {
    RTO,
    DELIVERED,
    RETURN,
    CANCELLED,
    RTO_COMPLETE,
    DOOR_STEP_EXCHANGED,
    RTO_INITIATED,
    RTO_LOCKED,
    READY_TO_SHIP,
    SHIPPED,
    UNKNOWN;
    public static OrderStatus fromString(String name) {
        for (OrderStatus orderStatus : OrderStatus.values()) {
            if (orderStatus.name().equalsIgnoreCase(name)) {
                return orderStatus;
            }
        }
        return OrderStatus.UNKNOWN; // Default value
    }
}
