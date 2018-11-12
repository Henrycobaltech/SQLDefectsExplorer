package cn.edu.sustc.cse.sql.defectsexplorer.entities

data class StackOverflowQA(
        val downvotes: Int = 0,
        val id: Int = 0,
        val answerScore: Int = 0,
        val title: String? = null,
        val body: String? = null,
        val questionScore: Int = 0,
        val questionFavoriate: Int = 0,
        val answer: String? = null,
        val answerFavoriate: Int = 0,
        val viewCount: Int = 0,
        val upvotes: Int = 0,
        val tags: List<Int> = ArrayList(),
        val categories: MutableSet<String> = HashSet()
)
