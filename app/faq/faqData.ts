import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChurch,
  faChild,
  faHandHoldingHeart,
  faUsers,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";

export interface FAQQuestion {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

export interface FAQCategory {
  title: string;
  icon: IconDefinition;
  questions: FAQQuestion[];
}

export interface FAQData {
  [key: string]: FAQCategory;
}

// FAQ Data organized by category
export const faqData: FAQData = {
  visiting: {
    title: "Your First Visit",
    icon: faChurch,
    questions: [
      {
        question: "When and where do you meet?",
        answer: "We gather every Sunday at 10:00 AM at 20041 South Tamiami Trail #1, Estero, FL 33928. You'll find us in Estero Ridge plaza, across Estero Parkway from Walmart. Coffee is always ready when you arrive.",
        link: { text: "Get directions", href: "/visit" },
      },
      {
        question: "What can I expect on a Sunday?",
        answer: "You can expect a warm, welcoming atmosphere. Our services include contemporary worship, a thoughtful message grounded in Scripture, and a community that is genuinely glad to see you. Services last about an hour.",
        link: { text: "Learn more about visiting", href: "/im-new" },
      },
      {
        question: "What should I wear?",
        answer: "Please come as you are. What matters most to us is that you're here.",
      },
      {
        question: "Will I be put on the spot or singled out?",
        answer: "Not at all. We want you to feel at ease. There's no pressure to stand, raise your hand, or introduce yourself. Simply come, be present, and experience the service at your own pace.",
      },
      {
        question: "Can I watch online before visiting in person?",
        answer: "Absolutely. We livestream every Sunday at 10 AM, and all of our past messages are available to watch anytime. It's a wonderful way to become familiar with our community before visiting.",
        link: { text: "Watch a service", href: "/live" },
      },
    ],
  },
  community: {
    title: "Finding Community",
    icon: faUsers,
    questions: [
      {
        question: "How can I connect with others here?",
        answer: "We understand that finding community takes time. After service, please stay for coffee and conversation. We also gather weekly at the pastor's home for a meal and fellowship—it's a meaningful way to build relationships and feel at home.",
        link: { text: "Find community", href: "/small-groups" },
      },
      {
        question: "What are Home Huddles?",
        answer: "Home Huddles are small groups that meet in homes throughout the week. They're a place to study Scripture together, share life's joys and challenges, and develop lasting friendships rooted in faith.",
        link: { text: "Join a Home Huddle", href: "/small-groups" },
      },
      {
        question: "How do I get involved?",
        answer: "There are many ways to serve and connect. Whether it's joining a Home Huddle, volunteering with our kids' ministry, or helping with Sunday setup, we'd love to help you find a place to belong and contribute.",
        link: { text: "Explore opportunities", href: "/serve" },
      },
    ],
  },
  kids: {
    title: "Kids & Families",
    icon: faChild,
    questions: [
      {
        question: "What programs do you have for kids?",
        answer: "We offer age-appropriate programs for infants through elementary-aged children during our Sunday service. Our volunteers create a safe, engaging environment where kids can learn about Jesus in ways that make sense for their age.",
        link: { text: "Learn about Thrive Kids", href: "/kids" },
      },
      {
        question: "Is childcare available during services?",
        answer: "Yes. We provide care for infants and toddlers, and age-specific programming for preschool and elementary children. All of our volunteers are background-checked and trained.",
      },
      {
        question: "Can I stay with my child during the service?",
        answer: "Absolutely. You're welcome to stay with your child in our kids' area until they feel comfortable. We want both you and your child to feel at ease.",
      },
    ],
  },
  faith: {
    title: "Faith & Beliefs",
    icon: faHandHoldingHeart,
    questions: [
      {
        question: "What does Thrive believe?",
        answer: "We believe Jesus Christ is Lord and Savior—the only way to the Father. Our faith rests on the historic 'Solas' of the Reformation: Scripture alone, grace alone, faith alone, Christ alone. Salvation is a gift, not something we earn. Wherever you are on your journey, you're welcome to explore these truths with us.",
        link: { text: "Read our beliefs", href: "/about/beliefs" },
      },
      {
        question: "Do I need to be a Christian to attend?",
        answer: "Not at all. You're welcome here, no matter where you are in your faith journey. We're a community that values honest questions and genuine seeking.",
      },
      {
        question: "How can I learn more about becoming a Christian?",
        answer: "We'd be honored to walk with you. You can speak with a pastor after any service, attend one of our Home Huddles, or reach out through our contact page. We're here to listen and help in any way we can.",
        link: { text: "Contact us", href: "/contact" },
      },
    ],
  },
  giving: {
    title: "Giving & Support",
    icon: faMobileScreen,
    questions: [
      {
        question: "How can I give to Thrive?",
        answer: "You can give online through our secure giving platform, via the Thrive app, or in person during Sunday services. We're grateful for your generosity, which helps us serve our community and share the gospel.",
        link: { text: "Give online", href: "/give" },
      },
      {
        question: "Is my giving tax-deductible?",
        answer: "Yes. Thrive Community Church is a 501(c)(3) nonprofit organization. You'll receive a year-end giving statement for tax purposes.",
      },
      {
        question: "Where does my giving go?",
        answer: "Your gifts support our Sunday gatherings, kids' ministry, community outreach, missions, and the day-to-day operations that make ministry possible. We're committed to stewarding your generosity faithfully.",
      },
    ],
  },
};

