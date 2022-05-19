package com.leonardom011.flappypixi.services

import com.leonardom011.flappypixi.util.randomID

class AuthenticationSystem() {
    companion object {

        private var auth: MutableMap<Int, MutableList<String>> = mutableMapOf<Int, MutableList<String>>()

        fun generateKey(userId: Int): String {
            var key = randomID()

            // Creating list with existing elements from auth
            var keyList: MutableList<String> = mutableListOf<String>()
            auth[userId]?.let { keyList.addAll(it) }
            // push new key to list
            keyList.add(key)
            auth[userId] = keyList
            return key
        }

        fun userExists(authKey: String): Boolean {
            for ((key, value) in auth) {
                if (value.contains(authKey)) {
                    return true
                }
            }
            return false
        }

        fun getUserId(authKey: String): Int? {
            for ((key, value) in auth) {
                if (value.contains(authKey)) {
                    return key
                }
            }
            return null
        }

        fun deleteKeysForUser(userId: Int): Boolean {
            auth.remove(userId)
            auth ?: return false
            return true
        }

        fun deleteKey(authKey : String) : Boolean {
            for ((key, value) in auth) {
                if (value.remove(authKey)) {
                    return true
                }
            }
            return false
        }
    }

}