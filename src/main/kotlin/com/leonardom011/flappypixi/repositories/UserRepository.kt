package com.leonardom011.flappypixi.repositories

import com.leonardom011.flappypixi.models.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Int> {
    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
}