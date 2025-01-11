package com.ecom.accounting.Accounting.ordermanagement;

import com.ecom.accounting.dtos.OrderCountByStatusResponseDto;
import com.ecom.accounting.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
interface OrdersRepository extends JpaRepository<Order,String> {
    @Query("SELECT o FROM Order o WHERE FUNCTION('MONTH', o.orderDate) = :month AND FUNCTION('YEAR', o.orderDate) = :year")
    List<Order> findByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT o FROM Order o WHERE DATE(o.orderDate) = :date")
    List<Order> findByOrderDate(@Param("date") LocalDateTime date);

    @Query("SELECT DATE(o.orderDate) AS orderDate, COUNT(o) AS orderCount " +
            "FROM Order o " +
            "WHERE EXTRACT(MONTH FROM o.orderDate) = :month AND EXTRACT(YEAR FROM o.orderDate) = :year " +
            "AND o.sellerId=:sellerId GROUP BY DATE(o.orderDate)")
    List<Object[]> findOrderCountsByDateInMonth(String sellerId, @Param("month") int month, @Param("year") int year);
    @Override
    Optional<Order> findById(@NonNull String id);

    @Query("SELECT new com.ecom.accounting.dtos.OrderCountByStatusResponseDto(o.orderStatus, COUNT(o)) " +
            "FROM Order o WHERE o.sellerId = :sellerId GROUP BY o.orderStatus")
    List<OrderCountByStatusResponseDto> countOrdersGroupedByStatus(@Param("sellerId") String sellerId);

    @Query("SELECT new com.ecom.accounting.dtos.OrderCountByStatusResponseDto(o.orderStatus, COUNT(o)) " +
            "FROM Order o WHERE o.sellerId = :sellerId and EXTRACT(MONTH FROM o.orderDate) = :month AND EXTRACT(YEAR FROM o.orderDate) = :year GROUP BY o.orderStatus")
    List<OrderCountByStatusResponseDto> countOrdersByMonthAndYearGroupedByStatus(@Param("sellerId") String sellerId, @Param("month") long month, @Param("year") long year);
}
