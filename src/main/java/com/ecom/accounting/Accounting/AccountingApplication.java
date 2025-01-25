package com.ecom.accounting.Accounting;

import com.ecom.accounting.Accounting.config.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.ecom.accounting.entities")
@EnableJpaRepositories(basePackages = "com.ecom.accounting.repositories")
@EnableConfigurationProperties(CorsProperties.class)
public class AccountingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountingApplication.class, args);
	}

}
