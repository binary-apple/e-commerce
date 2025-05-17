import { Box, Typography } from '@mui/material';
import { NotFoundConstants } from '../constants';
import errorImage from '/404_dog.png';

import styles from './OopsBox.module.scss';

export default function OopsBox() {
  return (
    <Box className={styles.animated__wrapper}>
      <Box className={styles.animated__wrapper_image}>
        <img src={errorImage} alt={NotFoundConstants.errorText} />
      </Box>

      <Typography variant="h2" component="h4" sx={{ fontWeight: 900 }}>
        {NotFoundConstants.errorText}
      </Typography>

      <Box className={styles.animated__wrapper_status}>
        {[...NotFoundConstants.errorCode.toString()].map((char, index) => (
          <Typography
            variant="h1"
            component="h4"
            key={index}
            className={styles.animated__wrapper_status_text}
            sx={{ fontWeight: 900 }}
          >
            {char}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
