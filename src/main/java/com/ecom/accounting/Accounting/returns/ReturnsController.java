package com.ecom.accounting.Accounting.returns;

import com.ecom.accounting.Accounting.security.TokenService;
import com.ecom.accounting.dtos.ReturnsResponseDto;
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
@RequestMapping("/returns")
public class ReturnsController {

    @Autowired
    private ReturnsService returnsService;

    @GetMapping
    public ResponseEntity<Page<ReturnsResponseDto>> getReturns(Pageable page, @AuthenticationPrincipal Jwt jwt, int month, int year) {
        String userId = TokenService.getUserIdFromToken(jwt);
        return ResponseEntity.ok(ReturnsResponseDto.toDto(returnsService.getReturns(page,userId,month,year)));
    }

}
