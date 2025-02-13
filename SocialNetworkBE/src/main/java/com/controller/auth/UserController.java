package com.controller.auth;



import com.entity.auth.Permission;
import com.entity.auth.Role;
import com.entity.auth.User;
import com.entity.auth.UserProfile;
import com.exception.UserException;
import com.response.AuthoritiesResponse;
import com.service.auth.UserProfileService;
import com.service.auth.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private UserProfileService userProfileService;

    public UserController(UserService userService,UserProfileService userProfileService){
        this.userProfileService=userProfileService;
        this.userService=userService;
    }

    @GetMapping("/")
    public ResponseEntity<String> getUserTokenHandler(@RequestHeader("Authorization") String token){
        return new ResponseEntity<String>(token, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
        User user=userService.findByJwt(token);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/basicInfo")
    public ResponseEntity<AuthoritiesResponse> getAuthoritiesHandler(@RequestHeader("Authorization") String token) throws UserException {
        User user=userService.findByJwt(token);
        UserProfile userProfile=userProfileService.findByUserId(user.getId());
        List<String> roles=new ArrayList<>();
        List<String> authorities=new ArrayList<>();

        for(Role role: user.getRoles()){
            roles.add(role.getRoleName());
            for(Permission permission: role.getPermissions()){
                authorities.add(permission.getPermissionName());
            }
        }

        AuthoritiesResponse authoritiesResponse=new AuthoritiesResponse(user.getEmail(), userProfile.getAvt(),userProfile.getName(),authorities,roles);
        return new ResponseEntity<AuthoritiesResponse>(authoritiesResponse, HttpStatus.OK);
    }


    @GetMapping("/{query}")
    public ResponseEntity<List<UserProfile>> searchUserHandler(@PathVariable("query") String query) throws UserException {
        System.out.println("query: "+query);
        List<UserProfile> users=userProfileService.searchUser(query);
        System.out.println(users.size());
        return new ResponseEntity<List<UserProfile>>(users, HttpStatus.OK);
    }

//    @PutMapping("/update")
//    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest req, @RequestHeader("Authorizaion") String token) throws UserException {
//        User user=userService.findByJwt(token);
//        userProfileService.updateUserProfile(user.getUserId(),req);
//        ApiResponse apiResponse=new ApiResponse("Update successfully",true);
//        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.ACCEPTED);
//    }



}
