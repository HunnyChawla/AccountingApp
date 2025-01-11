package com.ecom.accounting.Accounting.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
public class SecurityConfig {

    private final String KEYCLOAK_SERVER = "spring.security.oauth2.resourceserver.jwt.issuer-uri";

    @Autowired
    private Environment environment;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/login").permitAll() // Allow unauthenticated access to the login endpoint
                        .anyRequest().authenticated() // Require authentication for all other endpoints
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(jwtDecoder())) // Explicit JwtDecoder configuration
                );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // Point this to your Keycloak public key URL
        return NimbusJwtDecoder.withJwkSetUri(environment.getProperty(KEYCLOAK_SERVER)+"/protocol/openid-connect/certs")
                .build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults()) //enables cors
                //The rest of your configurations
                .build();
    }
}
