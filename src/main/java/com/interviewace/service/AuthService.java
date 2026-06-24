package com.interviewace.service;

import com.interviewace.dto.AuthResponse;
import com.interviewace.dto.LoginRequest;
import com.interviewace.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}
