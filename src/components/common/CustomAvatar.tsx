import React from 'react';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';


interface CustomAvatarProps {
  imageSrc: string | null;
  name: string | null;
  onAvatarClick: () => void;
}



const CustomAvatar : React.FC<CustomAvatarProps>= ({ imageSrc, name, onAvatarClick }) => {

    const initial = name ? name.charAt(0).toUpperCase() : '';


    return (
        <FormControl sx={{ alignItems: 'center', mb: 2 }}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Avatar onClick={onAvatarClick} sx={{ width: 56, height: 56, mb: 2 }}>
                  {imageSrc ? (
                    <img src={imageSrc} alt="Profile" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    // getInitialFromName((document.querySelector('input[name="name"]') as HTMLInputElement)?.value)
                    initial
                  )}
                </Avatar>
                {/* <Typography variant="caption" color="textSecondary">
                  이미지 선택
                </Typography> */}
              </Stack>
        </FormControl>
    );
};


export default CustomAvatar;