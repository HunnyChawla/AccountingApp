package com.ecom.accounting.Accounting.ordermanagement;

import com.ecom.accounting.Accounting.meeshoFileupload.FileUploadService;
import com.ecom.accounting.Accounting.ordermanagement.mapper.OrderMapper;
import com.ecom.accounting.Accounting.security.TokenService;
import com.ecom.accounting.dtos.OrderCountByStatusResponseDto;
import com.ecom.accounting.dtos.OrderCountDto;
import com.ecom.accounting.dtos.OrderDto;
import com.ecom.accounting.dtos.OrdersDataResponseDto;
import com.ecom.accounting.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
    public ResponseEntity<OrdersDataResponseDto> getOrders(@AuthenticationPrincipal Jwt token, @RequestParam("month") int month, @RequestParam("year") int year) {
        List<OrderCountDto> orderCountsByDateInMonth = ordersService.getOrderCountsByDateInMonth(TokenService.getUserIdFromToken(token),month, year);
        return ResponseEntity.ok(new OrdersDataResponseDto(orderCountsByDateInMonth));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDto>> getOrders(@PathVariable String orderId) {
        Optional<Order> orderById = ordersService.findOrderById(orderId);
        OrderDto dto = null;
        if(orderById.isPresent()) {
             dto = OrderMapper.toDTO(orderById.get());
            return ResponseEntity.ok(List.of(dto));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    @GetMapping("/countByOrderStatus")
    @Deprecated
    public ResponseEntity<List<OrderCountByStatusResponseDto>> getOrdersCountByStatus(@AuthenticationPrincipal Jwt token, @RequestParam("month") long month, @RequestParam("year") long year) {
        String userIdFromToken = TokenService.getUserIdFromToken(token);
        List<OrderCountByStatusResponseDto> orderCountByStatusResponseDtos = ordersService.getOrderCountByStatusResponseDtos(userIdFromToken,month,year);
        return ResponseEntity.ok(orderCountByStatusResponseDtos);
    }
}
