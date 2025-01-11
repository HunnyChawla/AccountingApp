package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.entities.CompleteOrderData;
import com.ecom.accounting.entities.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CompleteOrderDataRepository extends JpaRepository<CompleteOrderData, String> {
    Page<CompleteOrderData> findBySellerIdAndBankSettlementIsNotNull(String sellerId, Pageable pageable);

    Page<CompleteOrderData> findBySellerIdAndOrderStatusAndBankSettlementIsNotNull(String sellerId, Pageable pageable, OrderStatus orderStatus);

    @Query("SELECT COUNT(o) FROM CompleteOrderData o where o.sellerId = :sellerId And YEAR(o.orderDate) = :year AND MONTH(o.orderDate) = :month")
    long getOrderCountByMonthAndYear(String sellerId,Long month,Long year);
    @Query("SELECT COUNT(o) FROM CompleteOrderData o where o.sellerId = :sellerId And YEAR(o.orderDate) = :year")
    long getOrderCountByYear(String sellerId,Long year);


}
