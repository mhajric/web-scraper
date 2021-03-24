package dev.demo.scraper.dto;

import dev.demo.scraper.model.Suggestion;
import lombok.Getter;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
public class SuggestionResponse implements Serializable {

    private String url;

    private String title;

    private Set<String> keywords ;

    private Set<String> tags = new LinkedHashSet<>();

    public static SuggestionResponse toResponse(Suggestion suggestion) {
        SuggestionResponse response = new SuggestionResponse();
        response.url = suggestion.getUrl();
        response.title = suggestion.getTitle();
        response.keywords = new LinkedHashSet<>(suggestion.getKeywords());
        response.tags = new LinkedHashSet<>(suggestion.getTags());
        return response;
    }
}
