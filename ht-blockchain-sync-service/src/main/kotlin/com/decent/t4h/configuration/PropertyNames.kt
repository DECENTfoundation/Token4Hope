package com.decent.t4h.configuration

object PropertyNames {
    const val synchronizationFixedDelay = "\${synchronization.fixedDelay.in.milliseconds}"
    const val synchronizationInitialDelay = "\${synchronization.initialDelay.in.milliseconds}"
    const val synchronizationStartingBlock = "\${synchronization.startingBlock}"
    const val synchronizationStartingBlockKey = "\${synchronization.startingBlockKey}"
    const val blockchainMaxBlocksInOneRun = "\${blockchain.maxBlocksInOneRun}"
    const val blockchainAssetSymbol = "\${blockchain.assetSymbol}"
    const val blockchainUrl = "\${blockchain.url}"
}