package com.lahssini.billingservice.web;

import com.lahssini.billingservice.entities.Bill;
import com.lahssini.billingservice.feign.CustomerRestClient;
import com.lahssini.billingservice.feign.ProductRestClient;
import com.lahssini.billingservice.repository.BillRepository;
import com.lahssini.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillRestController {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductItemRepository productItemRepository;
    @Autowired
    private CustomerRestClient customerRestClient;
    @Autowired
    private ProductRestClient productRestClient;
    @GetMapping(path = "/bills/{id}")
    public Bill getBill(@PathVariable Long id){
        Bill bill = billRepository.findById(id).get();
        bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(productItem -> {
            productItem.setProduct(productRestClient.getProductById(productItem.getProductId()));
        });
        return bill;
    }
    @GetMapping(path = "/bills")
    public List<Bill> getAllBills() {
        List<Bill> bills = billRepository.findAll();
        bills.forEach(bill -> {
            bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));
            bill.getProductItems().forEach(productItem -> {
                productItem.setProduct(productRestClient.getProductById(productItem.getProductId()));
            });
        });
        return bills;
    }

    @PostMapping(path = "/bills")
    public Bill createBill(@RequestBody Bill bill) {
        // Save the new Bill
        Bill savedBill = billRepository.save(bill);
        return savedBill;
    }

    @DeleteMapping(path = "/bills/{id}")
    public void deleteBill(@PathVariable Long id) {
        billRepository.deleteById(id);
    }

    @PutMapping(path = "/bills/{id}")
    public Bill updateBill(@PathVariable Long id, @RequestBody Bill bill) {
        // Fetch the existing Bill from the repository
        Bill existingBill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));

        // Update the Bill's properties
        existingBill.setBillingDate(bill.getBillingDate());

        // Update the customerId, assuming the customer object in the bill is properly set
        existingBill.setCustomerId(bill.getCustomerId());

        // Update the list of ProductItems
        existingBill.setProductItems(bill.getProductItems());

        // If the customer needs to be linked, set it manually
        if (bill.getCustomer() != null) {
            existingBill.setCustomer(bill.getCustomer());
        }

        // Save the updated Bill to the database
        Bill updatedBill = billRepository.save(existingBill);

        return updatedBill;
    }




}