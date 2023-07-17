package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.NoteCreateRequest;
import com.example.resourceserver.dto.NoteDto;
import com.example.resourceserver.model.Note;
import org.mapstruct.Mapper;

@Mapper
public interface NoteMapper {
    Note noteCreateRequestToNote(NoteCreateRequest noteCreateRequest);
    NoteDto noteToNoteDto(Note note);
}
