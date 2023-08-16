package com.grodastr.clarityzip.controllers;

import com.grodastr.clarityzip.security.models.LoginResponseDTO;
import com.grodastr.clarityzip.security.models.RegistrationDTO;
import com.grodastr.clarityzip.security.models.User;
import com.grodastr.clarityzip.security.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body){
        System.out.println("Hello: "+body);
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
