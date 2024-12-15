package com.ecom.accounting.Accounting.ordermanagement;

import com.ecom.accounting.Accounting.meeshoFileupload.FileUploadService;
import com.ecom.accounting.Accounting.ordermanagement.dto.OrderCountDto;
import com.ecom.accounting.Accounting.ordermanagement.dto.OrderDto;
import com.ecom.accounting.Accounting.ordermanagement.dto.OrdersDataResponseDto;
import com.ecom.accounting.Accounting.ordermanagement.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private OrdersService ordersService;

    @GetMapping
    public ResponseEntity<OrdersDataResponseDto> getOrders(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<OrderCountDto> orderCountsByDateInMonth = ordersService.getOrderCountsByDateInMonth(month, year);
        return ResponseEntity.ok(new OrdersDataResponseDto(orderCountsByDateInMonth));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDto>> getOrders(@PathVariable String orderId) {
        Optional<Order> orderById = ordersService.findOrderById(orderId);
        OrderDto dto = null;
        if(orderById.isPresent()) {
             dto = OrderMapper.toDTO(orderById.get());
        }
        return ResponseEntity.ok(List.of(dto));
    }
}
