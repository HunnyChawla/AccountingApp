package com.ecom.accounting.Accounting.ordermanagement;

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
            "GROUP BY DATE(o.orderDate)")
    List<Object[]> findOrderCountsByDateInMonth(@Param("month") int month, @Param("year") int year);
    @Override
    Optional<Order> findById(@NonNull String id);
}
