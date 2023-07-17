package com.example.resourceserver.repository;

import com.example.resourceserver.model.Card;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends ListCrudRepository<Card, Long> {
}
