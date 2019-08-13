package com.decent.t4h.service

import ch.decent.sdk.DCoreSdk
import ch.decent.sdk.model.*
import ch.decent.sdk.net.TrustAllCerts
import com.decent.t4h.configuration.PropertyNames
import com.decent.t4h.dto.*
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.rxkotlin.toObservable
import okhttp3.OkHttpClient
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value

@Service
class BlockchainService(
        @Value(PropertyNames.blockchainMaxBlocksInOneRun)
        private val maxBlockSize: Long,

        @Value(PropertyNames.blockchainAssetSymbol)
        private val assetSymbol: String,

        @Value(PropertyNames.blockchainUrl)
        private val url: String
) {

    private val socket = DCoreSdk.createForWebSocket(
            TrustAllCerts.wrap(OkHttpClient().newBuilder()).build(),
            url, LoggerFactory.getLogger(assetSymbol))

    fun listBlocksFrom(startingBlock: Long): Single<List<BlockDto>> =
            socket.generalApi.getDynamicGlobalProperties().flatMapObservable {
                val nextBlockCount = it.lastIrreversibleBlockNum - startingBlock
                val blockCount = if (nextBlockCount > maxBlockSize) maxBlockSize else Math.max(nextBlockCount, 0)
                Observable.rangeLong(startingBlock, blockCount)
            }.flatMap {
                blockNumber -> socket.blockApi.get(blockNumber).toObservable().map { BlockDto(blockNumber, it) }
            }.toList()

    fun parseT4hTransfer2Operations(blocks: BlocksDto): Single<BlockTransfersDto> {
        val transactions = listTransactionsFromBlocks(blocks.blocks)
        val operations = listOperationsFromTransactions(transactions)

        return socket.assetApi.getByName(assetSymbol).toObservable().flatMap { asset ->
            operations.filter { it.transfer.amount.assetId.objectId == asset.id.objectId }.toObservable()
        }.toList().map {
            BlockTransfersDto(blocks.maximalBlock, it)
        }
    }

    fun calculateMaximalBlock(blocks: List<BlockDto>): BlocksDto {
        var maxBlock = 0L
        for (block in blocks) {
            if (block.blockNumber > maxBlock) maxBlock = block.blockNumber
        }
        return BlocksDto(maxBlock, blocks)
    }

    private fun listTransactionsFromBlocks(blocks: List<BlockDto>): List<BlockTransactionDto> {
        val transactions = mutableListOf<BlockTransactionDto>()
        for (block: BlockDto in blocks) {
            for(transaction in block.block.transactions) {
                transactions.add(BlockTransactionDto(block, transaction))
            }
        }
        return transactions
    }

    private fun listOperationsFromTransactions(transactions: List<BlockTransactionDto>): List<BlockTransferDto> {
        val operations = mutableListOf<BlockTransferDto>()
        for (transaction: BlockTransactionDto in transactions) {
            for(operation in transaction.transaction.operations) {
                if(operation.type == OperationType.TRANSFER2_OPERATION) {
                    operations.add(BlockTransferDto(transaction.block, operation as TransferOperation))
                }
            }
        }
        return operations
    }
}
