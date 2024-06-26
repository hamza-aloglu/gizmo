package com.example.resourceserver.controller;

import com.example.resourceserver.dto.CardColumnUpdateRequest;
import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.dto.CardIndexUpdateRequestList;
import com.example.resourceserver.service.CardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/cards")
public class CardController {
    private CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public CardDto saveCard(@Valid @RequestBody CardCreateRequest cardCreateRequest) {
        return cardService.saveCard(cardCreateRequest);
    }

    @GetMapping
    public List<CardDto> getAllCards(@Valid @NotNull @RequestParam Long kanbanColumnId) {
        return cardService.getAllCards(kanbanColumnId);
    }

    @GetMapping("/{boardId}")
    public List<CardDto> getAllCardsByBoard(@Valid @NotNull @PathVariable Long boardId) {
        return cardService.getAllCardsByBoardIdSortedByIndex(boardId);
    }

    @DeleteMapping
    public String deleteCard(@RequestParam @Valid @NotNull Long id) {
        cardService.deleteByCardId(id);
        return "Successfully deleted";
    }

    @PutMapping
    public String updateCards(@RequestBody CardIndexUpdateRequestList cardIndexUpdateRequestList) {
        cardService.updateCards(cardIndexUpdateRequestList.getCardIndexUpdateRequestList());
        return "hhh";
    }

    @PutMapping("/title")
    public String updateCardTitle(@Valid @NotNull @RequestParam String title,
                                  @Valid @NotNull @RequestParam Long cardId) {
        cardService.updateCardTitle(title, cardId);
        return "Successfully updated card title";
    }

    @PutMapping("/column")
    public String updateColumnOfCard(@RequestBody @Valid CardColumnUpdateRequest cardColumnUpdateRequest){
        cardService.updateColumnOfCard(cardColumnUpdateRequest);
        return "Successfully updated column of the card";
    }

    @PutMapping("/column/schedule")
    public String updateColumnOfCardScheduled(@RequestBody @Valid CardColumnUpdateRequest cardColumnUpdateRequest,
                                              @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")Date date) {
        cardService.updateColumnOfCardScheduled(cardColumnUpdateRequest, date);
        return "Card will be updated at: " + date;
    }

    @PutMapping("/column/schedule/unset")
    public String unsetColumnOfCardScheduled(@RequestParam @Valid Long cardId) {
        cardService.unsetUpdatingColumnOfCardScheduled(cardId);
        return "Successfully unset";
    }

    @PutMapping("/difficulty")
    public void updateCardDifficulty(@RequestParam @Valid @NotNull int difficulty, @RequestParam @Valid @NotNull Long cardId) {
        cardService.updateCardDifficulty(difficulty, cardId);
    }

    @PutMapping("/priority")
    public void updateCardPriority(@RequestParam @Valid @NotNull int priority, @RequestParam @Valid @NotNull Long cardId) {
        cardService.updateCardPriority(priority, cardId);
    }

    @PutMapping("/deadline")
    public void updateCardDeadline(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")Date deadline,
                                   @RequestParam @Valid @NotNull Long cardId) {
        cardService.updateCardDeadline(deadline, cardId);
    }

    @PutMapping("/parentTask")
    public void updateParentTask(@RequestParam @Valid @NotNull Long parentCardId,
                                 @RequestParam @Valid @NotNull Long cardId) {
        cardService.updateParentTask(parentCardId, cardId);
    }

    public CardService getCardService() {
        return cardService;
    }

    public void setCardService(CardService cardService) {
        this.cardService = cardService;
    }
}
