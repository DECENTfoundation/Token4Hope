package com.decent.t4h.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.logging.Level
import java.util.logging.Logger

@Service
class JobService {

    companion object {
        const val increment = 1
        val L: Logger = Logger.getLogger(this::class.java.name)
    }

    @Autowired
    lateinit var blockchainService: BlockchainService

    @Autowired
    lateinit var transferOperationService: TransferOperationService

    @Autowired
    lateinit var synchronizationControlService: SynchronizationControlService

    fun syncHumanityTokenTransactions() {
        try {
            val lastSyncBlock = synchronizationControlService.getLastSyncBlock()
            val data = blockchainService
                    .listBlocksFrom(lastSyncBlock + increment).toObservable()
                    .map { blockchainService.calculateMaximalBlock(it) }
                    .flatMap { blockchainService.parseT4hTransfer2Operations(it).toObservable() }
                    .doOnError { L.log(Level.SEVERE, it.message) }
                    .blockingFirst()
            val transactions = data.transfers.map { transferOperationService.buildTransaction(it) }
            transferOperationService.saveData(transactions, Math.max(lastSyncBlock, data.maximalBlock))
        } catch (e: Exception) {
            L.log(Level.SEVERE, e.message)
        }
    }
}
