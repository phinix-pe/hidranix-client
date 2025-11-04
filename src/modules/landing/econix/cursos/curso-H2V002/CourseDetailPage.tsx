import { useParams } from "react-router-dom";
import { Contact, CourseData } from "../../../shared/interfaces";
import {
  courseData as dataH2V002,
  courseContacts as ContactsH2V002,
} from "./CourseH2V002";
import {
  courseData as dataSSOMA001,
  courseContacts as ContactsSSOMA001,
} from "./CourseSSOMA001";
import {
  courseData as dataFOTOVOLTAICO001,
  courseContacts as ContactsFOTOVOLTAICO001,
} from "./CourseFOTOVOLTAICO001";

const coursesDatabase: { [key: string]: CourseData } = {
  H2V002: dataH2V002,
  SSOMA001: dataSSOMA001,
  FOTO001: dataFOTOVOLTAICO001,
};
const coursesContactsDatabase: { [key: string]: Contact[] } = {
  H2V002: ContactsH2V002,
  SSOMA001: ContactsSSOMA001,
  FOTO001: ContactsFOTOVOLTAICO001,
};

import { NavBarEconix } from "../../components/NavBarEconix";
import { CourseHero } from "../components/CourseHero";
import { CourseInfo } from "../components/CourseInfo";
import { CourseModules } from "../components/CourseModules";
import { CourseDetails } from "../components/CourseDetails";
import { CourseInvestment } from "../components/CourseInvestment";
import Footer from "../../../shared/components/Footer";
import { WhatsAppCTAMultiple } from "../../../shared/components/WhatsAppCTAMultiple";
import { CourseRegistration } from "../components/CourseRegistration";
const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/phinix.sac",
  instagramUrl: "https://www.instagram.com/phinix.sac",
  linkedinUrl: "https://www.linkedin.com/company/phinix-sac/",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courseData = coursesDatabase[courseId || ""];
  const courseContacts = coursesContactsDatabase[courseId || ""];
  if (!courseData) {
    return <div>Curso no encontrado</div>;
  }
  return (
    <>
      <NavBarEconix variantColor showTitle title={courseData.title} />
      <CourseHero courseData={courseData} />
      <CourseInfo courseData={courseData} />
      <CourseModules modules={courseData.modules} />
      <CourseDetails courseData={courseData} />
      <CourseInvestment courseData={courseData} />
      <CourseRegistration courseData={courseData} />
      <Footer
        {...phinixSocialLinks}
        slogan="Educación, consultoría y oportunidad de nuevas innovaciones exitosas"
        pageName="Econix"
      />
      <WhatsAppCTAMultiple contacts={courseContacts} />
    </>
  );
};
