package com.leonardom011.flappypixi.controllers

import com.leonardom011.flappypixi.repositories.UserRepository
import com.leonardom011.flappypixi.services.AuthenticationSystem
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HtmlController(private val repository: UserRepository) {

    @GetMapping("/")
    fun index(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        model["username"] = repository.findById(userId).get().username;
        return "rooms"
    }

    @GetMapping("/index")
    fun indexx(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        return "index"
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

    @GetMapping("/rooms")
    fun rooms(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        model["username"] =
        return "rooms"
    }

    @GetMapping("/login")
    fun login(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        return "index"
    }

    @GetMapping("/register")
    fun register(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "register"

        model["userid"] = userId
        return "index"
    }

}