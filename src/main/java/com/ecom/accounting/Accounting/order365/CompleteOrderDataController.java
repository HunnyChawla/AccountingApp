package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.order365.dto.CompleteOrderDto;
import com.ecom.accounting.Accounting.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order365")
public class CompleteOrderDataController {
    @Autowired
    public CompleteOrderService completeOrderService;

    @GetMapping
    public ResponseEntity<Page<CompleteOrderDto>> getCompleteOrderData(@AuthenticationPrincipal Jwt token, Pageable page) {
        String sellerId = TokenService.getUserIdFromToken(token);
        Page<CompleteOrderData> completeOrderData = completeOrderService.getCompleteOrderData(sellerId, page);
        return ResponseEntity.ok(CompleteOrderMapper.toDtoPage(completeOrderData));
    }
}
