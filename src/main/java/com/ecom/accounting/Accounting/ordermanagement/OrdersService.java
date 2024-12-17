package com.ecom.accounting.Accounting.ordermanagement;

import com.ecom.accounting.Accounting.ordermanagement.dto.OrderCountByStatusResponseDto;
import com.ecom.accounting.Accounting.ordermanagement.dto.OrderCountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    public List<OrderCountDto> getOrderCountsByDateInMonth(String sellerId,int month, int year) {
        List<Object[]> results = ordersRepository.findOrderCountsByDateInMonth(sellerId,month, year);

        // Convert results into a map for better usability
        List<OrderCountDto> orderCountDtos = new ArrayList<>();
        for (Object[] result : results) {
            String date = result[0].toString();  // Convert to date string
            Long count = (Long) result[1];       // Cast the count
            orderCountDtos.add(new OrderCountDto(date,count));
        }
        return orderCountDtos;
    }

    public Optional<Order> findOrderById(String orderId) {
        return ordersRepository.findById(orderId);
    }

    public List<Order> findAllById(List<String> orderIds) {
        return ordersRepository.findAllById(orderIds);
    }

    public List<Order> saveAll(List<Order> orders) {
        return ordersRepository.saveAll(orders);
    }

    public List<OrderCountByStatusResponseDto> getOrderCountByStatusResponseDtos(String sellerId) {
        return ordersRepository.countOrdersGroupedByStatus(sellerId);
    }
}
