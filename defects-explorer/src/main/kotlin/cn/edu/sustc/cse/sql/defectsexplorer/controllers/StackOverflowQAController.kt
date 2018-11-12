package cn.edu.sustc.cse.sql.defectsexplorer.controllers

import cn.edu.sustc.cse.sql.defectsexplorer.entities.StackOverflowQA
import cn.edu.sustc.cse.sql.defectsexplorer.persistence.StackOverflowQARepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/so-qa-pages")
class StackOverflowQAController @Autowired constructor(private val repo: StackOverflowQARepository) {

    @GetMapping("")
    fun getAll(@RequestParam(value = "page_idx", defaultValue = "0") pageIndex: Int,
               @RequestParam(value = "page_size", defaultValue = "10") pageSize: Int): ResponseEntity<*> {
        return when {
            pageIndex < 0 || pageSize <= 0 -> ResponseEntity.badRequest().body("Invalid page index or page size.")
            else -> {
                val result = this.repo.findAll(PageRequest.of(pageIndex, pageSize)).content
                ResponseEntity.ok(result)
            }
        }
    }

    @GetMapping("{id}")
    operator fun get(@PathVariable id: Int): ResponseEntity<StackOverflowQA> {
        val result = this.repo.findById(id)
        return when {
            result.isPresent -> ResponseEntity.ok(result.get())
            else -> ResponseEntity.notFound().build()
        }
    }

    @PutMapping("{id}/categories")
    fun replaceCategory(@PathVariable id: Int,
                        @RequestBody category: List<String>): ResponseEntity<String> {
        val qaOpt = this.repo.findById(id)
        return when {
            qaOpt.isPresent -> {
                val qa = qaOpt.get()
                qa.categories.clear()
                qa.categories.addAll(category)
                this.repo.save(qa)
                ResponseEntity.created(URI.create("")).build()
            }
            else -> ResponseEntity.notFound().build()
        }
    }
}
