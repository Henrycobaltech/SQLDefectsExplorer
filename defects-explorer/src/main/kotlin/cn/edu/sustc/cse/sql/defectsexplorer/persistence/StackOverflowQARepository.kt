package cn.edu.sustc.cse.sql.defectsexplorer.persistence

import cn.edu.sustc.cse.sql.defectsexplorer.entities.StackOverflowQA
import org.springframework.data.mongodb.repository.MongoRepository

interface StackOverflowQARepository : MongoRepository<StackOverflowQA, Int>
