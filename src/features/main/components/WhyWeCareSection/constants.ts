import missionPawIcon from '../../../../assets/images/MissionPawIcon.png';
import impactHomeIcon from '../../../../assets/images/ImpactHomeIcon.png';
import aboutSheltersIcon from '../../../../assets/images/AboutSheltersIcon.png';

export type DetailsCardProps = {
  title: string;
  imgUrl: string;
  text: string;
  isBg: boolean;
};

export const title = 'Why we care';

export const cardsData: DetailsCardProps[] = [
  {
    title: 'Our Mission',
    imgUrl: missionPawIcon,
    text: `We're dedicated to supporting animal shelters through donations. Through small contributions, we enable shelters to provide food, medical care, and find loving homes for animals.`,
    isBg: false,
  },
  {
    title: 'Impact',
    imgUrl: impactHomeIcon,
    text: 'Your contributions directly fund essential resources—from nutritious food and veterinary treatment to safe, comfortable housing—ensuring animals receive the care they need.',
    isBg: true,
  },
  {
    title: 'About Shelters',
    imgUrl: aboutSheltersIcon,
    text: 'We partner with trusted shelters committed to rescuing and rehabilitating animals in need, offering support every step of their journey from rescue to adoption.',
    isBg: false,
  },
];
