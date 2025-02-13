package com.controller.auth;


import com.entity.OTPCode;
import com.entity.auth.User;
import com.entity.auth.UserProfile;
import com.exception.UserException;
import com.request.AuthAccount;
import com.request.LoginRequest;
import com.request.UserRegister;
import com.response.AuthRespone;
import com.response.RegisterRespone;
import com.security.TokenProvider;
import com.service.MailService;
import com.service.OTPCodeService;
import com.service.UserDetailsCustom;
import com.service.auth.UserProfileService;
import com.service.auth.UserService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final MailService mailService;
    private OTPCodeService otpCodeService;
    private UserService userService;
    private UserProfileService userProfileService;
    private PasswordEncoder passwordEncoder;
    private UserDetailsCustom userDetailsCustom;
    private TokenProvider tokenProvider;
    public AuthController(OTPCodeService otpCodeService, MailService mailService, TokenProvider tokenProvider, UserDetailsCustom userDetailsCustom, UserProfileService userProfileService,
                          UserService userService, PasswordEncoder passwordEncoder) {
        this.mailService = mailService;
        this.userService=userService;
        this.userProfileService=userProfileService;
        this.passwordEncoder=passwordEncoder;
        this.userDetailsCustom=userDetailsCustom;
        this.tokenProvider=tokenProvider;
        this.otpCodeService=otpCodeService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler(@RequestBody UserRegister userRegister) throws UserException, MessagingException {
        String username=userRegister.getUsername();
        String email=userRegister.getEmail();
        String password=userRegister.getPassword();
        User isUser=userService.findByEmail(email);

        if(isUser!=null){
            RegisterRespone res=new RegisterRespone();
            res.setMessage("not accept");
            return new ResponseEntity<RegisterRespone>(res, HttpStatus.OK);
        }


        Random random = new Random();
        String randomInt = (10000 + random.nextInt(89999))+"";

        OTPCode otpCode=new OTPCode(randomInt,email,5);
        otpCodeService.saveOTPCode(otpCode);

        mailService.sendEmail(email,"Xac thuc tai khoan",randomInt,null);


        RegisterRespone res=new RegisterRespone();
        res.setEmail(email);
        res.setUsername(username);
        res.setPassword(password);
        res.setMessage("ok");

        return new ResponseEntity<RegisterRespone>(res, HttpStatus.OK);
    }


    @PostMapping("/authAccount")
    public ResponseEntity<AuthRespone> authAccountHandler(@RequestBody AuthAccount authAccount) throws UserException, MessagingException {
        String username=authAccount.getUsername();
        String email=authAccount.getEmail();
        String password=authAccount.getPassword();
        OTPCode otp=otpCodeService.findOTPCode(email,authAccount.getOtp());

        if(otp==null){
            AuthRespone res=new AuthRespone("",false);
            return new ResponseEntity<AuthRespone>(res, HttpStatus.OK);
        }

        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setUsername(username);
        createdUser.setPassword(passwordEncoder.encode(password));
//        createdUser.setPassword(password);


        UserProfile userProfile=new UserProfile();
        userProfile.setUser(createdUser);
        userProfile.setAvt("https://ui.dev/post-images/response.png");
        userProfile.setName("Vo danh");
        userProfileService.save(userProfile);

        Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt=tokenProvider.genarateToken(authentication);
        AuthRespone res=new AuthRespone(jwt,true);
        return new ResponseEntity<AuthRespone>(res, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthRespone> loginHandler(@RequestBody LoginRequest loginRequest) throws UserException {
        String username=loginRequest.getUsername();
        String password=loginRequest.getPassword();
        System.out.println(username+" "+password);
        Authentication authentication=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt=tokenProvider.genarateToken(authentication);
        AuthRespone res=new AuthRespone(jwt,true);
        return new ResponseEntity<AuthRespone>(res, HttpStatus.OK);

    }

    public Authentication authenticate(String username,String password){
        UserDetails userDetails= userDetailsCustom.loadUserByUsername(username);

        if(userDetails==null){
            throw new BadCredentialsException("Invalid user");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password or username");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }


}
