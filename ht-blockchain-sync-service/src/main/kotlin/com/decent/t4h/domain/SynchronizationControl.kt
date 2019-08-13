package com.decent.t4h.domain

import javax.persistence.*

@Entity
@Table(name = "synchronization_control")
data class SynchronizationControl(
        @Column(unique = true)
        val controlKey: String,
        var controlValue: Long,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1
)