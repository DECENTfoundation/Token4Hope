package com.decent.t4h

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
@ComponentScan
class T4hApplication {
	companion object {
		@JvmStatic fun main(args: Array<String>) {
			runApplication<T4hApplication>(*args)
		}
	}
}