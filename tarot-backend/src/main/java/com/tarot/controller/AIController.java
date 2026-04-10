package com.tarot.controller;

import com.tarot.model.Card;
import com.tarot.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {
    
    @Autowired
    private AIService aiService;
    
    @PostMapping("/analyze")
    public Map<String, Object> analyzeTarot(@RequestBody Map<String, Object> request) {
        String question = (String) request.getOrDefault("question", "");
        List<Map<String, Object>> cardsData = (List<Map<String, Object>>) request.get("cards");
        String spreadType = (String) request.getOrDefault("spreadType", "single");
        
        List<Card> cards = new ArrayList<>();
        if (cardsData != null) {
            for (Map<String, Object> cardData : cardsData) {
                Card card = new Card();
                card.setName((String) cardData.get("name"));
                card.setType((String) cardData.get("type"));
                card.setUpright("正位".equals(cardData.get("orientation")));
                card.setMeaning((String) cardData.get("meaning"));
                cards.add(card);
            }
        }
        
        String analysis = aiService.analyzeReading(question, cards, spreadType);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("analysis", analysis);
        
        return response;
    }
}