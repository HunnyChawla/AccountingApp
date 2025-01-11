package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.security.TokenService;
import com.ecom.accounting.dtos.CompleteOrderDto;
import com.ecom.accounting.entities.CompleteOrderData;
import com.ecom.accounting.entities.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order365")
public class CompleteOrderDataController {
    @Autowired
    public CompleteOrderService completeOrderService;

    @GetMapping
    public ResponseEntity<Page<CompleteOrderDto>> getCompleteOrderData(@AuthenticationPrincipal Jwt token, Pageable page, @RequestParam(required = false) OrderStatus orderStatus) {
        String sellerId = TokenService.getUserIdFromToken(token);
        if(orderStatus == null) {
            Page<CompleteOrderData> completeOrderData = completeOrderService.getCompleteOrderData(sellerId, page);
            return ResponseEntity.ok(CompleteOrderMapper.toDtoPage(completeOrderData));
        }
        else {
            Page<CompleteOrderData> completeOrderData = completeOrderService.getCompleteOrderData(sellerId, page, orderStatus);
            return ResponseEntity.ok(CompleteOrderMapper.toDtoPage(completeOrderData));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOrdersCount(@AuthenticationPrincipal Jwt token, @RequestParam(required = false) Long month, @RequestParam Long year) {
        String sellerId = TokenService.getUserIdFromToken(token);
        Long ordersCount = null;
        if(month !=null && year != null) {
            ordersCount = completeOrderService.getOrdersCount(sellerId,month,year);
        }
        else {
            ordersCount = completeOrderService.getOrdersCount(sellerId,year);
        }
        return ResponseEntity.ok(ordersCount);
    }
}
