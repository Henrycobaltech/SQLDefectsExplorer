package cn.edu.sustc.cse.sql.defectsexplorer.dtos

data class PagingResult<Content>(
        val pageSize: Int,
        val totalPages: Int,
        val content: List<Content>
)
