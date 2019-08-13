export enum BalanceEvent {
    Name = "balance",
    Reset = "balance/RESET",
    ShowByCard = "balance/SHOW_BY_CARD",
    ShowByCardSuccess = "balance/SHOW_BY_CARD_SUCCESS",
    ShowByCardFailure = "balance/SHOW_BY_CARD_FAILURE",
    ShowByChain = "balance/SHOW_BY_CHAIN",
    ShowByChainSuccess = "balance/SHOW_BY_CHAIN_SUCCESS",
    ShowByChainFailure = "balance/SHOW_BY_CHAIN_FAILURE",
    ResetActionCompletion = "balance/RESET_ACTION_COMPLETION",
}
