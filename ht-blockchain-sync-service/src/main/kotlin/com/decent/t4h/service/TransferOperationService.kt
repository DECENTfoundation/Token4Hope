package com.decent.t4h.service

import com.decent.t4h.domain.TransferOperation
import com.decent.t4h.dto.BlockTransferDto
import com.decent.t4h.repository.TransferOperationRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Service
class TransferOperationService {

    @Autowired
    lateinit var synchronizationControlService: SynchronizationControlService

    @Autowired
    lateinit var repository: TransferOperationRepository

    @Transactional(rollbackFor = [Exception::class])
    fun saveData(transferOperations: List<TransferOperation>, maxBlock: Long) {
        repository.saveAll(transferOperations)
        synchronizationControlService.saveMaximalBlock(maxBlock)
    }

    fun buildTransaction(operation: BlockTransferDto): TransferOperation =
            TransferOperation(
                    OffsetDateTime.of(LocalDateTime.of(
                            operation.block.block.timestamp.year,
                            operation.block.block.timestamp.monthValue,
                            operation.block.block.timestamp.dayOfMonth,
                            operation.block.block.timestamp.hour,
                            operation.block.block.timestamp.minute,
                            operation.block.block.timestamp.second,
                            operation.block.block.timestamp.nano
                    ), ZoneOffset.UTC),
                    operation.transfer.from.objectId,
                    operation.transfer.to.objectId,
                    operation.block.blockNumber,
                    operation.transfer.amount.amount.toString(),
                    OffsetDateTime.of(LocalDateTime.now(), ZoneOffset.UTC),
                    OffsetDateTime.of(LocalDateTime.now(), ZoneOffset.UTC)
            )
}
