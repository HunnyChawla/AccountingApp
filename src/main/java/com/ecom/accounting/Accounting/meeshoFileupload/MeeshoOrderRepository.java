package com.ecom.accounting.Accounting.meeshoFileupload;

import com.ecom.accounting.entities.MeeshoOrderData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeeshoOrderRepository extends JpaRepository<MeeshoOrderData, Long> {
    List<MeeshoOrderData> findByProcessingStatus(int processingStatus);
}
