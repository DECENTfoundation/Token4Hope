package com.decent.t4h.dto

import ch.decent.sdk.model.TransferOperation

data class BlockTransferDto(
        val block: BlockDto,
        val transfer: TransferOperation
)