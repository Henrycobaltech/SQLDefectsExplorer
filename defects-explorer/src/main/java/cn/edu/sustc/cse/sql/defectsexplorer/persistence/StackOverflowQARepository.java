package cn.edu.sustc.cse.sql.defectsexplorer.persistence;

import cn.edu.sustc.cse.sql.defectsexplorer.entities.StackOverflowQA;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StackOverflowQARepository extends MongoRepository<StackOverflowQA, ObjectId> {
}
