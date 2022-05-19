package com.leonardom011.flappypixi.controllers

import com.leonardom011.flappypixi.services.AuthenticationSystem
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HtmlController {

    @GetMapping("/")
    fun index(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        return "rooms"
    }

    @GetMapping("/index")
    fun indexx(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
        return "index"
    }

    @GetMapping("/rooms")
    fun rooms(@CookieValue(name = "authentication-key", defaultValue = "") authKey : String, model: Model) : String {
        val userId = AuthenticationSystem.getUserId(authKey) ?: return "login"

        model["userid"] = userId
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