package cn.edu.sustc.cse.sql.defectsexplorer.controllers;

import cn.edu.sustc.cse.sql.defectsexplorer.entities.PullRequest;
import cn.edu.sustc.cse.sql.defectsexplorer.persistence.PullRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pull-requests")
public class PullRequestsController {

    private final PullRequestsRepository repo;

    @Autowired
    public PullRequestsController(PullRequestsRepository repo) {
        this.repo = repo;
    }

    @GetMapping("")
    public ResponseEntity<List<PullRequest>> getAll() {
        return ResponseEntity.ok(
                repo.findAll().stream().limit(10).collect(Collectors.toList())
        );
    }

}
