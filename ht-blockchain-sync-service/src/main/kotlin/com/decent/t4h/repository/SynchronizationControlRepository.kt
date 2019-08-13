package com.decent.t4h.repository

import com.decent.t4h.domain.SynchronizationControl
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SynchronizationControlRepository : CrudRepository<SynchronizationControl, Long> {
    fun findByControlKey(controlKey: String): List<SynchronizationControl>
}
