package com.gifthub.movement.dto;

import com.gifthub.gifticon.dto.GifticonDto;
import com.gifthub.gifticon.entity.Gifticon;
import com.gifthub.gifticon.enumeration.MovementStatus;
import com.gifthub.user.dto.UserDto;
import com.gifthub.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MovementDto {

    private Long id;
    private UserDto fromUser;
    private UserDto toUser;
    private GifticonDto gifticon;
    private MovementStatus movementStatus;

}
