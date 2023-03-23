// 患者
import patient_home from "@/assets/tabbarIcon/patient_home.png";
import patient_home_active from "@/assets/tabbarIcon/patient_home_active.png";
import patient_treatment from "@/assets/tabbarIcon/patient_treatment.png";
import patient_treatment_active from "@/assets/tabbarIcon/patient_treatment_active.png";
import patient_education from "@/assets/tabbarIcon/patient_education.png";
import patient_education_active from "@/assets/tabbarIcon/patient_education_active.png";
import patient_my from "@/assets/tabbarIcon/patient_my.png";
import patient_my_active from "@/assets/tabbarIcon/patient_my_active.png";
import doctor_index from "@/assets/tabbarIcon/doctor_index.png";
import doctor_index_active from "@/assets/tabbarIcon/doctor_index_active.png";
import doctor_patient from "@/assets/tabbarIcon/doctor_patient.png";
import doctor_patient_active from "@/assets/tabbarIcon/doctor_patient_active.png";
import doctor_message from "@/assets/tabbarIcon/doctor_message.png";
import doctor_message_active from "@/assets/tabbarIcon/doctor_message_active.png";
import doctor_my from "@/assets/tabbarIcon/doctor_my.png";
import doctor_my_active from "@/assets/tabbarIcon/doctor_my_active.png";
const patient = [
  {
    iconPath: patient_home,
    selectedIconPath: patient_home_active,
    text: "首页",
    customIcon: true,
    pagePath: "/pages/patient/index",
  },
  {
    iconPath: patient_treatment,
    selectedIconPath: patient_treatment_active,
    text: "治疗卡",
    customIcon: true,
    pagePath: "/pages/patient/treatment",
  },
  {
    iconPath:patient_education,
    selectedIconPath: patient_education_active,
    text: "健康宣教",
    customIcon: true,
    pagePath: "/pages/patient/education",
  },
  {
    iconPath:patient_my,
    selectedIconPath: patient_my_active,
    text: "我的",
    customIcon: true,
    pagePath: "/pages/patient/my",
  },
];
// 医生
const doctor = [
  {
    iconPath: doctor_index,
    selectedIconPath: doctor_index_active,
    text: "首页",
    isDot: false,
    pagePath: "/pages/doctor/index",
  },
  {
    iconPath: doctor_patient,
    selectedIconPath: doctor_patient_active,
    text: "患者",
    isDot: false,
    pagePath: "/pages/doctor/patient",
  },
  {
    iconPath: doctor_message,
    selectedIconPath: doctor_message_active,
    text: "患者留言",
    isDot: false,
    pagePath: "/pages/doctor/message",
  },
  {
    iconPath: doctor_my,
    selectedIconPath: doctor_my_active,
    text: "我的",
    isDot: false,
    pagePath: "/pages/doctor/my",
  },
];

export default {
  doctor,
  patient,
};
