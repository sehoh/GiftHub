package com.gifthub.user.entity;

import com.gifthub.user.dto.LocalUserDto;
import com.gifthub.user.dto.UserDto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity @Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("LOCAL")
public class LocalUser extends User {

    private String password;
    private String confirmpassword;

    public LocalUserDto toLocalUserDto() {
        return LocalUserDto.builder()
                .id(super.getId())
                .email(super.getEmail())
                .name(super.getName())
                .nickname(super.getNickname())
                .gender(super.getGender())
                .confirmpassword(this.confirmpassword)
                .password(this.password)
                .tel(super.getTel())
                .year(super.getYear())
                .birthdate(super.getBirthDate())
                .point(super.getPoint())
                .build();
    }

}
