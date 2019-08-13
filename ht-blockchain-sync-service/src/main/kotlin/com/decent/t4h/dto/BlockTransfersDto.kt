package com.decent.t4h.dto

data class BlockTransfersDto(
        val maximalBlock: Long,
        val transfers: List<BlockTransferDto>
)