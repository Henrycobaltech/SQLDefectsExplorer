package cn.edu.sustc.cse.sql.defectsexplorer.persistence;

import cn.edu.sustc.cse.sql.defectsexplorer.entities.PullRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PullRequestsRepository extends MongoRepository<PullRequest, Integer> {
}
