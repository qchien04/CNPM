package com.config;


import com.filter.JwtTokenValidator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authz -> authz
                                .requestMatchers("/api/**").authenticated()
                                .anyRequest().permitAll())
                //.oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()))
                .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration corsConfig = new CorsConfiguration();
                        // Chỉ định nguồn gốc cụ thể
                        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:3001","http://localhost:5174",
                                                                    "http://localhost:5173","http://127.0.0.1:5500"));
                        // Chỉ định các phương thức HTTP cụ thể
                        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));

                        // Bật xác thực (cookies, token), không được để * trong setAllowedOrigins
                        corsConfig.setAllowCredentials(true);

                        // Chỉ định các headers cụ thể
                        corsConfig.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
                        // Các header được phơi bày cho client
                        corsConfig.setExposedHeaders(Arrays.asList("Authorization"));
                        // Thời gian cache
                        corsConfig.setMaxAge(3600L);
                        return corsConfig;
                    }
                }))

                .formLogin(withDefaults())
                .csrf(csrf -> csrf.disable())
                .addFilterBefore(new JwtTokenValidator(),BasicAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(daoAuthenticationProvider);
    }


//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance(); // Không mã hóa mật khẩu
//    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



}

