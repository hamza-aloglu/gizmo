package com.example.resourceserver.controller;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.service.CardService;
import jakarta.validation.Valid;
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
    public List<CardDto> getAllCards() {
        return cardService.getAllCards();
    }

    @DeleteMapping
    public String deleteCard(@RequestParam Long id) {
        cardService.deleteByCardId(id);
        return "Successfully deleted";
    }


    public CardService getCardService() {
        return cardService;
    }

    public void setCardService(CardService cardService) {
        this.cardService = cardService;
    }
}
