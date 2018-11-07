package cn.edu.sustc.cse.sql.defectsexplorer.controllers;

import cn.edu.sustc.cse.sql.defectsexplorer.entities.PullRequest;
import cn.edu.sustc.cse.sql.defectsexplorer.persistence.PullRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pull-requests")
public class PullRequestsController {

    private final PullRequestsRepository repo;

    @Autowired
    public PullRequestsController(PullRequestsRepository repo) {
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
    public ResponseEntity<PullRequest> get(@PathVariable int id) {
        var result = this.repo.findById(id);
        if (!result.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result.get());
    }

    @PutMapping("{id}/categories")
    public ResponseEntity<String> replaceCategory(@PathVariable int id,
                                                  @RequestBody List<String> category) {
        var prOpt = this.repo.findById(id);
        if (!prOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        var pr = prOpt.get();
        pr.getCategories().clear();
        pr.getCategories().addAll(category);
        this.repo.save(pr);
        return ResponseEntity.created(null).build();
    }
}
