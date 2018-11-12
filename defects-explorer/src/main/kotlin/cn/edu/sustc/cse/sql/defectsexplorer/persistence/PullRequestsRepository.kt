package cn.edu.sustc.cse.sql.defectsexplorer.persistence

import cn.edu.sustc.cse.sql.defectsexplorer.entities.PullRequest
import org.springframework.data.mongodb.repository.MongoRepository

interface PullRequestsRepository : MongoRepository<PullRequest, Int>
