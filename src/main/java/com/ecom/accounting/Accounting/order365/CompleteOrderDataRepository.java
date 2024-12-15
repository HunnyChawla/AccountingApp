package com.ecom.accounting.Accounting.order365;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompleteOrderDataRepository extends JpaRepository<CompleteOrderData, String> {
    Page<CompleteOrderData> findBySellerIdAndBankSettlementIsNotNull(String sellerId, Pageable pageable);
}
