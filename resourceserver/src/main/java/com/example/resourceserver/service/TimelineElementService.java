package com.example.resourceserver.service;

import com.example.resourceserver.dto.TimelineElementCreateRequest;
import com.example.resourceserver.dto.TimelineElementDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.TimelineElementMapper;
import com.example.resourceserver.model.Board;
import com.example.resourceserver.model.Timeline;
import com.example.resourceserver.model.TimelineElement;
import com.example.resourceserver.repository.TimelineElementRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TimelineElementService {
    private TimelineElementRepository timelineElementRepository;
    private BoardService boardService;
    private TimelineService timelineService;
    private TimelineElementMapper timelineElementMapper = Mappers.getMapper(TimelineElementMapper.class);

    public TimelineElementService(TimelineElementRepository timelineElementRepository, BoardService boardService, TimelineService timelineService) {
        this.timelineElementRepository = timelineElementRepository;
        this.boardService = boardService;
        this.timelineService = timelineService;
    }

    public TimelineElementDto createTimelineElement(TimelineElementCreateRequest req) {
        TimelineElement timelineElement = timelineElementMapper.timelineElementCreateRequestToTimelineElement(req);

        Long boardId = req.getBoardId();
        if (boardId != null && boardId != 0) {
            Board board = boardService.getBoard(req.getBoardId());
            timelineElement.setBoard(board);
        }

        Timeline timeline = timelineService.get(req.getTimelineId());
        timelineElement.setTimeline(timeline);

        TimelineElement savedTimelineElement = timelineElementRepository.save(timelineElement);
        return timelineElementMapper.timelineElementToTimelineElementDto(savedTimelineElement);
    }

    public void deleteTimelineElement(Long id) {
        if (!timelineElementRepository.existsById(id)) {
            throw new NotFoundException("Timeline element not found with id: " + id);
        }
        timelineElementRepository.deleteById(id);
    }

    public void updateTitle(Long id, String title) {
        TimelineElement timelineEl = this.get(id);
        timelineEl.setTitle(title);
        timelineElementRepository.save(timelineEl);
    }

    public void updateSubtitle(Long id, String subtitle) {
        TimelineElement timelineEl = this.get(id);
        timelineEl.setSubtitle(subtitle);
        timelineElementRepository.save(timelineEl);
    }

    public void updateDate(Long id, Date date) {
        TimelineElement timelineEl = this.get(id);
        timelineEl.setDate(date);
        timelineElementRepository.save(timelineEl);
    }

    public void updateDesc(Long id, String desc) {
        TimelineElement timelineEl = this.get(id);
        timelineEl.setDescription(desc);
        timelineElementRepository.save(timelineEl);
    }

    public void updateBoard(Long id, Long boardId) {
        TimelineElement timelineEl = this.get(id);

        Board board = null;
        if (boardId != 0) {
            board = boardService.getBoard(boardId);
        }

        timelineEl.setBoard(board);
        timelineElementRepository.save(timelineEl);
    }

    protected TimelineElement get(Long id) {
        Optional<TimelineElement> timelineElementOptional = timelineElementRepository.findById(id);
        if (timelineElementOptional.isEmpty()) {
            throw new NotFoundException("Timeline element not found with id: " + id);
        }
        return timelineElementOptional.get();
    }
}
