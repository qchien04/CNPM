package com.security;


import com.constant.JwtConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenProvider {

    SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    public String genarateToken(Authentication authentication){
        String jwt= Jwts.builder().setIssuer("Achien").setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+86400000))
                .claim("email",authentication.getName()).claim("authorities", authentication.getAuthorities())
                .signWith(key).compact();

        return jwt;
    }
    public String getEmailFromToken(String jwt) {
        try {
            jwt = jwt.substring(7);
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
            return String.valueOf(claims.get("email"));
        } catch (JwtException e) {
            throw new IllegalStateException("Invalid token", e);
        }
    }

}
