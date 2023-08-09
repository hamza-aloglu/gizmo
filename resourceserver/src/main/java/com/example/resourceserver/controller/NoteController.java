package com.example.resourceserver.controller;

import com.example.resourceserver.dto.NoteContentUpdateRequest;
import com.example.resourceserver.dto.NoteCreateRequest;
import com.example.resourceserver.dto.NoteDto;
import com.example.resourceserver.service.NoteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping
    public String deleteNote(@Valid @NotNull @RequestParam Long id) {
        noteService.deleteByNoteId(id);
        return "Successfully deleted note";
    }

    @GetMapping
    public List<NoteDto> getNotes(@Valid @NotNull @RequestParam Long cardId ) {
        return noteService.getNotes(cardId);
    }

    @PutMapping("/title")
    public String updateNoteTitle(@Valid @NotNull @RequestParam Long noteId,
                                  @Valid @NotNull @RequestParam String title) {
        noteService.updateNoteTitle(noteId, title);
        return "Successfully updated note title";
    }

    public NoteService getNoteService() {
        return noteService;
    }

    public void setNoteService(NoteService noteService) {
        this.noteService = noteService;
    }
}
