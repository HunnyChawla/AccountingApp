package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CompleteOrderService {
    @Autowired
    CompleteOrderDataRepository completeOrderDataRepository;

    public Page<CompleteOrderData> getCompleteOrderData(String sellerId, Pageable pageable) {
        return completeOrderDataRepository.findBySellerIdAndBankSettlementIsNotNull(sellerId, pageable);
    }
    public Page<CompleteOrderData> getCompleteOrderData(String sellerId, Pageable pageable, OrderStatus orderStatus) {
        return completeOrderDataRepository.findBySellerIdAndOrderStatusAndBankSettlementIsNotNull(sellerId, pageable, orderStatus);
    }
}
