package com.lahssini.billingservice.web;

import com.lahssini.billingservice.entities.Bill;
import com.lahssini.billingservice.entities.ProductItem;
import com.lahssini.billingservice.feign.ProductRestClient;
import com.lahssini.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductItemRestController {
    @Autowired
    private ProductItemRepository productItemRepository;
    @Autowired
    private ProductRestClient productRestClient;
    @GetMapping(path = "/productitems")
    public List<ProductItem> getAllProductItems() {
        List<ProductItem> productItems = productItemRepository.findAll();
        productItems.forEach(productItem -> {
            productItem.setProduct(productRestClient.getProductById(productItem.getProductId()));

        });
        return productItems;
    }

    @PostMapping(path = "/productitems")
    public ProductItem createProductItem(@RequestBody ProductItem productItem) {
        // Save the new Bill
        ProductItem savedProductItem = productItemRepository.save(productItem);
        return savedProductItem;
    }


    @DeleteMapping("/productitems/{id}")
    public void deleteProductItem(@PathVariable Long id) {
        if (productItemRepository.existsById(id)) {
            productItemRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Le ProductItem avec l'ID " + id + " n'existe pas.");
        }
    }
}
