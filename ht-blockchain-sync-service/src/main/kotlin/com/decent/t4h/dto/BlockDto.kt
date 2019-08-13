package com.decent.t4h.dto

import ch.decent.sdk.model.SignedBlock

data class BlockDto(
        val blockNumber: Long,
        val block: SignedBlock
)