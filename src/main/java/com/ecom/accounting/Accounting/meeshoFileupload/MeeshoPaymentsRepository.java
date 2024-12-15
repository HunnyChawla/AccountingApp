package com.ecom.accounting.Accounting.meeshoFileupload;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeeshoPaymentsRepository extends JpaRepository<MeeshoPaymentData, Long> {
    List<MeeshoPaymentData> findByProcessingStatus(int processingStatus);
}
