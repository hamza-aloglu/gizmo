package com.example.resourceserver.service;

import com.example.resourceserver.dto.NoteContentUpdateRequest;
import com.example.resourceserver.dto.NoteCreateRequest;
import com.example.resourceserver.dto.NoteDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.NoteMapper;
import com.example.resourceserver.model.Note;
import com.example.resourceserver.repository.NoteRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private NoteRepository noteRepository;
    private CardService cardService;
    NoteMapper noteMapper = Mappers.getMapper(NoteMapper.class);

    public NoteService(NoteRepository noteRepository, CardService cardService) {
        this.noteRepository = noteRepository;
        this.cardService = cardService;
    }

    public NoteDto saveNote(NoteCreateRequest noteCreateRequest) {
        Note note = noteMapper.noteCreateRequestToNote(noteCreateRequest);

        Long cardId = noteCreateRequest.getCardId();
        if (!cardService.isExistByCardId(cardId)) {
            throw new NotFoundException("Card does not exist with id: " + cardId);
        }
        note.setCard(cardService.getCardById(noteCreateRequest.getCardId()));
        Note savedNote = noteRepository.save(note);

        return noteMapper.noteToNoteDto(savedNote);
    }

    protected Note getNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NotFoundException("Note not found with id: " + id);
        }

        return noteRepository.getById(id);
    }

    public void updateNoteContent(NoteContentUpdateRequest noteContentUpdateRequest) {
        Note note = getNote(noteContentUpdateRequest.getId());
        note.setContent(noteContentUpdateRequest.getContent());
        noteRepository.save(note);
    }

    public void deleteByNoteId(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NotFoundException("Note not found with id: " + id);
        }
        noteRepository.deleteById(id);
    }

    public List<NoteDto> getNotes(Long cardId) {
        if (!cardService.isExistByCardId(cardId)) {
            throw new NotFoundException("card not found with id: " + cardId);
        }

        List<Note> notes = noteRepository.getAllByCard_Id(cardId);
        return noteMapper.noteListToNoteDtoList(notes);
    }

    public void updateNoteTitle(Long noteId, String title) {
        Note note = this.getNote(noteId);
        note.setTitle(title);
        noteRepository.save(note);
    }
}
