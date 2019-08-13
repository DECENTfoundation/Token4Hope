package com.decent.t4h.domain

import java.time.OffsetDateTime
import javax.persistence.*

@Entity
@Table(name = "transfer_operations")
data class TransferOperation(
        val blockTimestamp: OffsetDateTime,
        val fromAddress: String,
        val toAddress: String,
        val block: Long,
        val amount: String,
        var createdAt: OffsetDateTime,
        var updatedAt: OffsetDateTime,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1
)