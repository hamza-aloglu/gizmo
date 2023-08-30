package com.example.resourceserver.repository;

import com.example.resourceserver.model.Timeline;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineRepository extends ListCrudRepository<Timeline, Long> {
    List<Timeline> findAllByUsername(String username);
}
