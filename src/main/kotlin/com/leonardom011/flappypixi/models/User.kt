package com.leonardom011.flappypixi.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "users")
class User (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(columnDefinition = "serial") var user_id: Int = 0,
    var email: String,
    var username: String,
    var password: String,
    var last_login: LocalDateTime,
    var added_at: LocalDateTime
)