package cn.edu.sustc.cse.sql.defectsexplorer.controllers

import cn.edu.sustc.cse.sql.defectsexplorer.dtos.PagingResult
import cn.edu.sustc.cse.sql.defectsexplorer.entities.PullRequest
import cn.edu.sustc.cse.sql.defectsexplorer.persistence.PullRequestsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI
import kotlin.math.ceil

@RestController
@RequestMapping("/api/pull-requests")
class PullRequestsController @Autowired constructor(private val repo: PullRequestsRepository) {

    @GetMapping("")
    fun getAll(@RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
               @RequestParam("page_size", defaultValue = "10") pageSize: Int) = when {
        pageIndex < 0 || pageSize <= 0 -> ResponseEntity.badRequest().body("Invalid page index or page size.")
        else -> PagingResult(
                pageSize,
                totalPages = ceil(this.repo.count().toDouble() / pageSize).toInt(),
                content = PageRequest.of(pageIndex, pageSize).let { this.repo.findAll(it) }.content
        ).let { ResponseEntity.ok(it) }
    }

    @GetMapping("{id}")
    operator fun get(@PathVariable id: Int): ResponseEntity<PullRequest> {
        val result = this.repo.findById(id)
        return when {
            result.isPresent -> ResponseEntity.ok(result.get())
            else -> ResponseEntity.notFound().build()
        }
    }

    @PutMapping("{id}/categories")
    fun replaceCategory(@PathVariable id: Int,
                        @RequestBody category: List<String>): ResponseEntity<String> {
        val prOpt = this.repo.findById(id)
        return when {
            prOpt.isPresent -> {
                val pr = prOpt.get()
                pr.categories.clear()
                pr.categories.addAll(category)
                this.repo.save(pr)
                ResponseEntity.created(URI.create("")).build()
            }
            else -> ResponseEntity.notFound().build()
        }
    }
}
