package cn.edu.sustc.cse.sql.defectsexplorer.controllers;

import cn.edu.sustc.cse.sql.defectsexplorer.entities.StackOverflowQA;
import cn.edu.sustc.cse.sql.defectsexplorer.persistence.StackOverflowQARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("{id}")
    public ResponseEntity<StackOverflowQA> get(@PathVariable int id) {
        var result = this.repo.findById(id);
        if (!result.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result.get());
    }

    @PutMapping("{id}/categories")
    public ResponseEntity<String> replaceCategory(@PathVariable int id,
                                                  @RequestBody List<String> category) {
        var qaOpt = this.repo.findById(id);
        if (!qaOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        var qa = qaOpt.get();
        qa.getCategories().clear();
        qa.getCategories().addAll(category);
        this.repo.save(qa);
        return ResponseEntity.created(null).build();
    }
}
