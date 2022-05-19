package com.leonardom011.flappypixi.controllers

import com.leonardom011.flappypixi.models.User
import com.leonardom011.flappypixi.repositories.UserRepository
import com.leonardom011.flappypixi.services.AuthenticationSystem
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.*

class RegisterInfo (
    var email : String,
    var username : String,
    var password : String)

class LoginInfo (
    var username : String,
    var password : String)

@RestController
@RequestMapping("/auth")
class LoginController(private val repository: UserRepository) {

    @RequestMapping("/login", consumes = ["application/json"])
    fun loginPost(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, @RequestBody loginInfo : LoginInfo) : ResponseEntity<Any> {

        // Check if user is already logged in
        if (AuthenticationSystem.userExists(authKey)) {
            return ResponseEntity.ok().build()
        }
        // change username to be lowercase
        val username = loginInfo.username.lowercase(Locale.getDefault())

        val user = repository.findByUsername(username)

        // If username does not exist or if password is not correct return error 401
        if (user == null || user.password != loginInfo.password) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }

        val key = AuthenticationSystem.generateKey(user.user_id)
        val resCookie = ResponseCookie
            .from("authentication-key", key)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge((1 * 24 * 60 * 60).toLong())
            .domain("localhost")
            .build()

        // Set user last login to now
        user.last_login = LocalDateTime.now(ZoneOffset.UTC)
        repository.save(user)


        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).build()
    }

    @RequestMapping("/register", consumes = ["application/json"])
    fun registerPost(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, @RequestBody registerInfo : RegisterInfo) : ResponseEntity<Any> {

        // Check if user is already logged in
        if (AuthenticationSystem.userExists(authKey)) {
            return ResponseEntity.ok().build()
        }
        // change username to be lowercase
        val username = registerInfo.username.lowercase(Locale.getDefault())
        val password = registerInfo.password
        val email = registerInfo.email.lowercase(Locale.getDefault())

        // If username does exist return error 401
        if (repository.findByUsername(username) != null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // If email already exists return error 401
        if (repository.findByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var user = User(0, email, username, password, LocalDateTime.now(ZoneOffset.UTC), LocalDateTime.now(ZoneOffset.UTC))
        repository.save(user)

        val key = AuthenticationSystem.generateKey(user.user_id)
        val resCookie = ResponseCookie
            .from("authentication-key", key)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge((1 * 24 * 60 * 60).toLong())
            .domain("localhost")
            .build()


        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).build()
    }

    @GetMapping("/logout")
    fun logout(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String) : ResponseEntity<Any> {

        val userId = AuthenticationSystem.getUserId(authKey)
        if (userId != null) {
            AuthenticationSystem.deleteKey(authKey)
        }

        val resCookie = ResponseCookie
            .from("authentication-key", null.toString())
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0)
            .domain("localhost")
            .build()

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).build();
    }

    @GetMapping("/delete-keys")
    fun deleteKeys(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String) : ResponseEntity<Any> {

        val userId = AuthenticationSystem.getUserId(authKey)
        if (userId != null) {
            AuthenticationSystem.deleteKeysForUser(userId)
        }

        val resCookie = ResponseCookie
            .from("authentication-key", null.toString())
            .build()

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).build()
    }

}