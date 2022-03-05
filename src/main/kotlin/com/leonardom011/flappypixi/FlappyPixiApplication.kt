package com.leonardom011.flappypixi

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlappyPixiApplication

fun main(args: Array<String>) {
    runApplication<FlappyPixiApplication>(*args) {
        setBannerMode(Banner.Mode.OFF)
    }
}
