import log from "@/lib/logger";
import { Avatar, FormControl, Stack } from "@mui/material";
import { useState } from "react";

type MyAvatarProps = {
    imgSrc?: string;
    name?: string;
    size?: 'basic' | 'sm' | 'md' | 'lg' | 'big';
    onAvatarClick?: () => void;
}

const MyAvatar: React.FC<MyAvatarProps> = ({
    imgSrc: initialImgSrc,
    name,
    size = 'basic',
    onAvatarClick
}) => {
    const [imgSrc, setImgSrc] = useState<string | undefined >(initialImgSrc)

    const sizeMap = { basic: 40, sm: 24, md: 40, lg: 56, big: 80 };
    const sizeValue = sizeMap[size] || sizeMap['basic'];

    const defaultAvatarClickHandler = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // 이미지 관련 모든 확장자 가능
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file) {
                // 이미지 미리보기를 위함
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImgSrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            };
        };

        input.click();
    };

    const handleClick = () => {
        if(onAvatarClick) {
            onAvatarClick();
        } else {
            defaultAvatarClickHandler();
        }
    };

    const getInitial = () => {
        return name? name.charAt(0).toUpperCase() : '';
    }

    return (
        <FormControl
            sx = {{
                alignItems: "center",
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Stack direction="column" alignItems="center" spacing={1}>
                <Avatar
                    onClick={handleClick}
                    sx={{
                        width: sizeValue,
                        height: sizeValue,
                        backgroundColor: 'ghost.main',
                        cursor: 'pointer',
                        '&:hover': {
                        opacity: 0.8,
                        },
                        mb: 2,
                    }}
                >
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt="Profile"
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '50%' ,
                                objectFit: 'contain', // 비율에 맞춰 이미지 변경
                            }}
                        />

                    ) : (
                        getInitial()
                    )}
                </Avatar>
            </Stack>
        </FormControl>
    )
}
 
export default MyAvatar