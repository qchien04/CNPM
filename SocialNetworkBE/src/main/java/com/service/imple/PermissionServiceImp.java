package com.service.imple;

import com.entity.auth.Permission;
import com.repository.PermissionRepo;
import com.service.auth.PermissionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class PermissionServiceImp implements PermissionService {
    private PermissionRepo permissionRepo;
    @Override
    @Transactional
    public Permission savePermission(Permission permission) {
        return permissionRepo.save(permission);
    }

    @Override
    public Permission findPermissionById(Integer id) {
        Optional<Permission> permission=permissionRepo.findByPermissionId(id);
        return permission.isPresent()?permission.get():null;
    }

    @Override
    public Permission findPermissionByName(String name) {
        Optional<Permission> permission=permissionRepo.findByPermissionName(name);
        return permission.isPresent()?permission.get():null;
    }

    @Override
    public void deletePermissionById(Integer id) {
        permissionRepo.delete(findPermissionById(id));
    }

    @Override
    public List<Permission> findAllPermission() {
        return permissionRepo.findAll();
    }
}
