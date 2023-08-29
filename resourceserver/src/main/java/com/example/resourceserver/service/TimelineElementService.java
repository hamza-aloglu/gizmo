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
}
