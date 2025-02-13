package com.service.imple;


import com.entity.auth.User;
import com.exception.UserException;
import com.repository.UserRepo;
import com.security.TokenProvider;
import com.service.auth.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@org.springframework.stereotype.Service
public class UserServiceImp implements UserService {


    private final UserRepo userRepo;
    private TokenProvider tokenProvider;

    public UserServiceImp(UserRepo userRepo,TokenProvider tokenProvider) {
        this.userRepo = userRepo;
        this.tokenProvider=tokenProvider;
    }

    @Transactional
    public User save(User user) {
        return userRepo.save(user);
    }

    public User findById(int id) throws UserException {
        Optional<User> result= userRepo.findById(id);
        if(result.isPresent()){
            return result.get();
        }
        throw new UserException("User not found : "+id);

    }

    public Page<User> findAll(int page,int size) {
        return userRepo.findAll(PageRequest.of(page,size, Sort.by("userId")));
    }

    @Transactional
    public void deleteById(int id) {
        userRepo.deleteById(id);
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User findByJwt(String jwt) throws UserException{
        String email= tokenProvider.getEmailFromToken(jwt);
        if(email==null){
            throw new BadCredentialsException("Invalid token");
        }
        User user=findByEmail(email);
        if (user==null){
            throw new UserException("User not found with email "+email);
        }
        return user;
    }

    public User findByUsername(String username) {
        Optional<User> result= userRepo.findByUsername(username);
        return result.orElse(null);
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> listUser=userRepo.searchUser(query);
        return listUser;
    }







}
