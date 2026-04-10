package com.tarot.controller;

import com.tarot.model.Card;
import com.tarot.service.TarotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/tarot")
@CrossOrigin(origins = "*")
public class TarotController {
    
    @Autowired
    private TarotService tarotService;
    
    @PostMapping("/draw")
    public Map<String, Object> drawCards(@RequestBody Map<String, Object> request) {
        int deckType = (int) request.getOrDefault("deckType", 3);
        int drawCount = (int) request.getOrDefault("drawCount", 1);
        
        List<Card> cards = tarotService.drawCards(deckType, drawCount);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("cards", cards);
        
        return response;
    }
}