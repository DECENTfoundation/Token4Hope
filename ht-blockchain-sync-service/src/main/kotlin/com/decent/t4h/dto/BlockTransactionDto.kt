package com.decent.t4h.dto

import ch.decent.sdk.model.ProcessedTransaction

data class BlockTransactionDto(
        val block: BlockDto,
        val transaction: ProcessedTransaction
)