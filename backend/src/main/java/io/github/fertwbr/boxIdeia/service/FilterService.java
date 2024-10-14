package io.github.fertwbr.boxIdeia.service;

import io.github.fertwbr.boxIdeia.model.Idea;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;

@Service
public class FilterService {

    private static final Map<String, Set<String>> FILTER_SYNONYMS = new HashMap<>();

  static {
    FILTER_SYNONYMS.put("Criatividade", new HashSet<>(Arrays.asList("imaginação", "inventividade", "originalidade", "inspiração", "criatividade", "genialidade", "inovação", "arte", "expressão", "ideias", "pensamento criativo")));
    FILTER_SYNONYMS.put("Inovação", new HashSet<>(Arrays.asList("novidade", "modernização", "revolução", "criação", "descoberta", "inovação", "avanço", "progresso", "melhoria", "transformação", "renovação", "mudança")));
    FILTER_SYNONYMS.put("Produtividade", new HashSet<>(Arrays.asList("eficiência", "rendimento", "desempenho", "otimização", "produtividade", "eficácia", "efetividade", "proatividade", "gestão de tempo", "foco", "organização", "planejamento")));
    FILTER_SYNONYMS.put("Tecnologia", new HashSet<>(Arrays.asList("informática", "digital", "computação", "software", "hardware", "inovação tecnológica", "tecnologia", "ciência", "engenharia", "eletrônica", "robótica", "inteligência artificial", "automação")));
    FILTER_SYNONYMS.put("Marketing", new HashSet<>(Arrays.asList("propaganda", "publicidade", "promoção", "vendas", "comunicação", "marketing", "branding", "estratégia de mercado", "análise de mercado", "campanha publicitária", "mercadologia", "relações públicas")));
    FILTER_SYNONYMS.put("Design", new HashSet<>(Arrays.asList("criação visual", "arte", "estética", "interface", "experiência do usuário", "ux", "ui", "design gráfico", "design de produto", "design de interiores", "design industrial", "design de moda", "design de interação")));
}


    public void assignFilters(Idea idea) {
        String title = idea.getTitle().toLowerCase();
        String description = idea.getDescription().toLowerCase();
        Set<String> assignedFilters = new HashSet<>();


        for (String filter : FILTER_SYNONYMS.keySet()) {
            if (textContainsFilter(title, filter) || textContainsFilter(description, filter)) {
                assignedFilters.add(filter);
            }
        }

        idea.setFilters(assignedFilters);
    }

    private boolean textContainsFilter(String text, String filter) {
        if (text.contains(filter.toLowerCase())) {
            return true;
        }

        Set<String> synonyms = FILTER_SYNONYMS.get(filter);
        if (synonyms != null) {
            for (String synonym : synonyms) {
                if (text.contains(synonym.toLowerCase())) {
                    return true;
                }
            }

        }
        return false;

    }
}