package com.decent.t4h.scheduled

import com.decent.t4h.configuration.PropertyNames
import com.decent.t4h.service.JobService

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ScheduledTasks {

    @Autowired
    lateinit var jobService: JobService

    @Scheduled(fixedDelayString = PropertyNames.synchronizationFixedDelay)
    fun reportCurrentTime() {
        jobService.syncHumanityTokenTransactions()
    }
}
