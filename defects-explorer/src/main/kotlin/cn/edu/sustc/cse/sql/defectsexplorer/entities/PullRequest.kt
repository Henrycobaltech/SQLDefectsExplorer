package cn.edu.sustc.cse.sql.defectsexplorer.entities

import java.util.*
import kotlin.collections.ArrayList

data class PullRequest(
        val id: Int,
        val repoId: Int = 0,
        val repoName: String? = null,
        val title: String? = null,
        val body: String? = null,
        val updatedAt: Date? = null,
        val createdAt: Date? = null,
        val commitsCount: Int = 0,
        val isMerged: Boolean = false,
        val mergedAt: Date? = null,
        val issueNumber: Int = 0,
        val state: String? = null,
        val changedFiles: Int = 0,
        val headSha: String? = null,
        val comments: List<Comment>? = ArrayList(),
        val categories: MutableSet<String> = HashSet()
)
