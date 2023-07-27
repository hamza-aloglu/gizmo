package com.example.resourceserver.controller;

import com.example.resourceserver.dto.CardColumnUpdateRequest;
import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.service.CardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

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
        return cardService.getAllCardsByBoardId(boardId);
    }

    @DeleteMapping
    public String deleteCard(@RequestParam @Valid @NotNull Long id) {
        cardService.deleteByCardId(id);
        return "Successfully deleted";
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


    public CardService getCardService() {
        return cardService;
    }

    public void setCardService(CardService cardService) {
        this.cardService = cardService;
    }
}
