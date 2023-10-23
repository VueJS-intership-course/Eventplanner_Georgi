<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand text-xl" :to="{name:'Home-Page'}">EventApp</router-link>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link text-light" :to="{name:'Event-Catalog'}">Events</router-link>
                    <router-link class="nav-link text-light" :to="{name:'SignUp-Page'}">Sign Up</router-link>
                    <router-link class="nav-link text-light" :to="{name:'SignIn-Page'}">Sign In</router-link>
                </div>
                <div class="ml-auto">
                    <router-link class="nav-link text-light" :to="{name:'Profile-Page'}">Profile</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>