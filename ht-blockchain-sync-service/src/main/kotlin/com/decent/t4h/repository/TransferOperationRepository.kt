package com.decent.t4h.repository

import com.decent.t4h.domain.TransferOperation
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TransferOperationRepository : CrudRepository<TransferOperation, Long>
