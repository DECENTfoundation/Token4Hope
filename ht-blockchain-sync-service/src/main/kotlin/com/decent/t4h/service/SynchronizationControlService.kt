package com.decent.t4h.service

import com.decent.t4h.configuration.PropertyNames
import com.decent.t4h.domain.SynchronizationControl
import com.decent.t4h.repository.SynchronizationControlRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class SynchronizationControlService (
    @Value(PropertyNames.synchronizationStartingBlock)
    private val startingBlock: Long,

    @Value(PropertyNames.synchronizationStartingBlockKey)
    private val startingBlockKey: String
) {

    @Autowired
    lateinit var syncControlRepository: SynchronizationControlRepository

    fun getLastSyncBlock(): Long {
        val syncControl = syncControlRepository.findByControlKey(startingBlockKey)
        if (syncControl.isEmpty()) {
            return startingBlock
        }

        return Math.max(startingBlock, syncControl.first().controlValue)
    }

    @Transactional(rollbackFor = [Exception::class])
    fun saveMaximalBlock(blockNumber: Long) {
        var newData = SynchronizationControl(
                startingBlockKey,
                blockNumber
        )

        val existingData = syncControlRepository.findByControlKey(startingBlockKey)
        if (!existingData.isEmpty()) {
            newData = existingData.first()
            newData.controlValue = blockNumber
        }
        syncControlRepository.save(newData)
    }
}
