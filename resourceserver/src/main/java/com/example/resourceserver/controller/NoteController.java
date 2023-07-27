package com.example.resourceserver.controller;

import com.example.resourceserver.dto.NoteContentUpdateRequest;
import com.example.resourceserver.dto.NoteCreateRequest;
import com.example.resourceserver.dto.NoteDto;
import com.example.resourceserver.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NoteController {
    private NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public NoteDto saveNote(@Valid @RequestBody NoteCreateRequest noteCreateRequest) {
        return noteService.saveNote(noteCreateRequest);
    }

    @PutMapping("/content")
    public String updateNoteContent(@Valid @RequestBody NoteContentUpdateRequest noteContentUpdateRequest) {
        noteService.updateNoteContent(noteContentUpdateRequest);
        return "Successfully updated note";
    }

    public NoteService getNoteService() {
        return noteService;
    }

    public void setNoteService(NoteService noteService) {
        this.noteService = noteService;
    }
}
