package com.example.resourceserver.repository;

import com.example.resourceserver.model.Timeline;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineRepository extends ListCrudRepository<Timeline, Long> {
}
