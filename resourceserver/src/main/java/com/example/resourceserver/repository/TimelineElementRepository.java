package com.example.resourceserver.repository;

import com.example.resourceserver.model.TimelineElement;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineElementRepository extends ListCrudRepository<TimelineElement, Long> {
}
