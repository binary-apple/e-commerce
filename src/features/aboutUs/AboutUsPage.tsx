import {
  Box,
  Typography,
  Link,
  Grid,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { NavLink } from 'react-router';
import { AboutUsConstants } from './constants';
import styles from './AboutUsPage.module.scss';
import { Paths } from '../../types/paths';
import SchoolIcon from '../../layouts/components/RSScoolLogoIcon/SchoolLogoIcon';

export default function AboutUsPage() {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{
        maxWidth: { lg: '1108px', md: '850px', xs: '90%' },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 'auto',
        py: { lg: 13, md: 8, xs: 4 },
      }}
    >
      <Typography component="h2" variant="h3" textAlign="center">
        {AboutUsConstants.title}
      </Typography>
      <Typography component="h3" variant="h5" textAlign="center">
        {AboutUsConstants.description}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {AboutUsConstants.members.map((member) => (
          <Grid
            key={member.name}
            className={styles['about_member']}
            bgcolor={'background.paper'}
            size={{ xs: 12, sm: 10, md: 4 }}
          >
            <Box
              component="img"
              alt={member.name}
              src={member.photo}
              className={styles['about_member-image']}
              sx={{
                height: { sm: '350px', md: '300px' },
              }}
            />
            <CardContent
              className={styles['about_member-text']}
              sx={{ textAlign: 'center', flexGrow: 1 }}
            >
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {member.role}
              </Typography>
              <Typography variant="body1" className={styles['about_member-bio']}>
                {member.bio}
              </Typography>
              <Box className={styles['about_member-text-contributions']}>
                <Typography variant="subtitle2" color="text.secondary">
                  {AboutUsConstants.constibutionsTitle}
                </Typography>
                <List>
                  {member.contributions.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{ m: 0, p: 0 }}
                      className={styles['about_member-text-list']}
                    >
                      <ListItemIcon>
                        <TaskAltIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        className={styles['about_member-text-list-item']}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
            <Box textAlign={'center'}>
              <Link href={member.github} target="_blank">
                {AboutUsConstants.memberButtonTitle} {member.nickname}
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid size={12} justifyContent="center" bgcolor={'background.paper'} borderRadius={8} p={2}>
        <Typography component="p" variant="body1" textAlign="center">
          {AboutUsConstants.teamCollaboration}
        </Typography>
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" component={NavLink} to={Paths.CATALOG}>
          {AboutUsConstants.buttonTitle}
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        borderRadius={8}
        p={2}
        bgcolor={'background.paper'}
      >
        <Grid size={{ xs: 12, md: 1 }} textAlign="center">
          <Link href="https://rs.school/" target="_blank" rel="noopener noreferrer">
            <SchoolIcon fontSize="large" sx={{ width: 80, height: 80 }} />
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" textAlign="center">
            {AboutUsConstants.rssDescription}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} textAlign="center">
          <Button
            variant="contained"
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {AboutUsConstants.rssButtonTitle}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
