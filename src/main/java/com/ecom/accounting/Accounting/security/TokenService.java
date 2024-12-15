package com.ecom.accounting.Accounting.security;

import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public class TokenService {

    public static String getUserIdFromToken(Jwt jwt) {
        // Extract the user ID from the `sub` claim
        return jwt.getClaimAsString("sub");
    }

    public static List<String> getRolesFromToken(Jwt jwt) {
        // Extract user roles (if configured in the token)
        return jwt.getClaimAsStringList("roles");
    }
}
