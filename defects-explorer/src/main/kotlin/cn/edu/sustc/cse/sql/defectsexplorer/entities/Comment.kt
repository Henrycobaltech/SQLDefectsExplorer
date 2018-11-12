package cn.edu.sustc.cse.sql.defectsexplorer.entities

import java.util.*

data class Comment(
        val body: String? = null,
        val createdAt: Date? = null,
        val updatedAt: Date? = null
)
