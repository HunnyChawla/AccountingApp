package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompleteOrderDataRepository extends JpaRepository<CompleteOrderData, String> {
    Page<CompleteOrderData> findBySellerIdAndBankSettlementIsNotNull(String sellerId, Pageable pageable);

    Page<CompleteOrderData> findBySellerIdAndOrderStatusAndBankSettlementIsNotNull(String sellerId, Pageable pageable, OrderStatus orderStatus);
}
