package cn.edu.sustc.cse.sql.defectsexplorer.controllers;

import cn.edu.sustc.cse.sql.defectsexplorer.persistence.StackOverflowQARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/so-qa-pages")
public class StackOverflowQAController {

    private final StackOverflowQARepository repo;

    @Autowired
    public StackOverflowQAController(StackOverflowQARepository repo) {
        this.repo = repo;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(@RequestParam(value = "page_idx", defaultValue = "0") int pageIndex,
                                    @RequestParam(value = "page_size", defaultValue = "10") int pageSize) {
        if (pageIndex < 0 || pageSize <= 0) {
            return ResponseEntity.badRequest().body("Invalid page index or page size.");
        }
        return ResponseEntity.ok(
                this.repo.findAll(PageRequest.of(pageIndex, pageSize)).getContent()
        );
    }
}
