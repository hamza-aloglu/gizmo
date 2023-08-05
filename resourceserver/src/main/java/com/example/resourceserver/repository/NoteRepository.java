package com.example.resourceserver.repository;

import com.example.resourceserver.model.Note;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends ListCrudRepository<Note, Long> {
    Note getById(Long id);
    List<Note> getAllByCard_Id(Long cardId);
}
